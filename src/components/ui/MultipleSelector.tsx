'use client';

import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { X } from 'lucide-react';
import * as React from 'react';
import { forwardRef, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';

import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  fixed?: boolean;
  [key: string]: string | boolean | undefined;
}

interface GroupOption {
  [key: string]: Option[];
}

interface MultipleSelectorProps {
  value?: Option[];
  defaultOptions?: Option[];
  options?: Option[];
  placeholder?: string;
  loadingIndicator?: React.ReactNode;
  emptyIndicator?: React.ReactNode;
  delay?: number;
  triggerSearchOnFocus?: boolean;
  onSearch?: (value: string) => Promise<Option[]>;
  onChange?: (options: Option[]) => void;
  maxSelected?: number;
  onMaxSelected?: (maxLimit: number) => void;
  hidePlaceholderWhenSelected?: boolean;
  disabled?: boolean;
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  selectFirstItem?: boolean;
  creatable?: boolean;
  commandProps?: React.ComponentPropsWithoutRef<typeof Command>;
  inputProps?: Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, 'value' | 'placeholder' | 'disabled'>;
  hideClearAllButton?: boolean;
}

export interface MultipleSelectorRef {
  selectedValue: Option[];
  input: HTMLInputElement;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string) {
  if (options.length === 0) return {};
  if (!groupBy) return { '': options };

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || '';
    if (!groupOption[key]) groupOption[key] = [];
    groupOption[key].push(option);
  });
  return groupOption;
}

function removePickedOption(groupOption: GroupOption, picked: Option[]) {
  const cloneOption = JSON.parse(JSON.stringify(groupOption)) as GroupOption;

  for (const [key, value] of Object.entries(cloneOption)) {
    cloneOption[key] = value.filter((val) => !picked.find((p) => p.value === val.value));
  }
  return cloneOption;
}

function isOptionsExist(groupOption: GroupOption, targetOption: Option[]) {
  for (const [, value] of Object.entries(groupOption)) {
    if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
      return true;
    }
  }
  return false;
}

const CommandEmpty = forwardRef<HTMLDivElement, React.ComponentProps<typeof CommandPrimitive.Empty>>(({ className, ...props }, forwardedRef) => {
  const render = useCommandState((state) => state.filtered.count === 0);

  if (!render) return null;

  return (
    <div
      ref={forwardedRef}
      className={cn('-py-6 -text-center -text-sm', className)}
      cmdk-empty=""
      role="presentation"
      {...props}
    />
  );
});

CommandEmpty.displayName = 'CommandEmpty';

const MultipleSelector = React.forwardRef<MultipleSelectorRef, MultipleSelectorProps>(
  (
    {
      value,
      onChange,
      placeholder,
      defaultOptions: arrayDefaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      loadingIndicator,
      emptyIndicator,
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      hidePlaceholderWhenSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      selectFirstItem = true,
      creatable = false,
      triggerSearchOnFocus = false,
      commandProps,
      inputProps,
      hideClearAllButton = false,
    }: MultipleSelectorProps,
    ref: React.Ref<MultipleSelectorRef>,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const mouseOn = React.useRef<boolean>(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [selected, setSelected] = React.useState<Option[]>(value || []);
    const [options, setOptions] = React.useState<GroupOption>(transToGroupOption(arrayDefaultOptions, groupBy));
    const [inputValue, setInputValue] = React.useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);

    React.useImperativeHandle(ref, () => ({
      selectedValue: [...selected],
      input: inputRef.current as HTMLInputElement,
      focus: () => inputRef.current?.focus(),
    }), [selected]);

    const handleUnselect = React.useCallback(
      (option: Option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
      },
      [onChange, selected],
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
          if (e.key === 'Delete' || e.key === 'Backspace') {
            if (input.value === '' && selected.length > 0) {
              const lastSelectOption = selected[selected.length - 1];
              if (!lastSelectOption.fixed) handleUnselect(selected[selected.length - 1]);
            }
          }
          if (e.key === 'Escape') input.blur();
        }
      },
      [handleUnselect, selected],
    );

    useEffect(() => {
      if (value) setSelected(value);
    }, [value]);

    useEffect(() => {
      if (!arrayOptions || onSearch) return;
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) setOptions(newOption);
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      const doSearch = async () => {
        setIsLoading(true);
        const res = await onSearch?.(debouncedSearchTerm);
        setOptions(transToGroupOption(res || [], groupBy));
        setIsLoading(false);
      };

      const exec = async () => {
        if (!onSearch || !open) return;
        if (triggerSearchOnFocus) await doSearch();
        if (debouncedSearchTerm) await doSearch();
      };

      void exec();
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    const CreatableItem = () => {
      if (!creatable) return undefined;
      if (isOptionsExist(options, [{ value: inputValue, label: inputValue }]) || selected.find((s) => s.value === inputValue)) return undefined;

      const Item = (
        <CommandItem
          value={inputValue}
          className="-cursor-pointer"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSelect={(value: string) => {
            if (selected.length >= maxSelected) {
              onMaxSelected?.(selected.length);
              return;
            }
            setInputValue('');
            const newOptions = [...selected, { value, label: value }];
            setSelected(newOptions);
            onChange?.(newOptions);
          }}
        >
          {`Create "${inputValue}"`}
        </CommandItem>
      );

      if (!onSearch && inputValue.length > 0) return Item;
      if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) return Item;

      return undefined;
    };

    const EmptyItem = React.useCallback(() => {
      if (!emptyIndicator) return undefined;
      if (onSearch && !creatable && Object.keys(options).length === 0) {
        return (
          <CommandItem value="-" disabled>
            {emptyIndicator}
          </CommandItem>
        );
      }
      return <CommandEmpty>{emptyIndicator}</CommandEmpty>;
    }, [creatable, emptyIndicator, onSearch, options]);

    const selectables = React.useMemo<GroupOption>(() => removePickedOption(options, selected), [options, selected]);

    const commandFilter = React.useCallback(() => {
      if (commandProps?.filter) return commandProps.filter;
      if (creatable) {
        return (value: string, search: string) => value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
      }
      return undefined;
    }, [creatable, commandProps?.filter]);

    return (
      <Command
        {...commandProps}
        onKeyDown={(e) => {
          handleKeyDown(e);
          commandProps?.onKeyDown?.(e);
        }}
        className={cn(
          '-overflow-visible -border-0 -bg-transparent -px-2 -py-2',
          commandProps?.className,
        )}
        shouldFilter={false}
      >
        <div
          className={cn(
            '-flex -items-center -rounded-md -border -border-input -bg-background -ring-offset-background -focus-within:-outline-none -focus-within:-ring-2 -focus-within:-ring-ring -focus-within:-ring-offset-2 -disabled:-cursor-not-allowed -disabled:-opacity-50',
            className,
          )}
        >
          <div
            className="-flex -grow -flex-wrap -items-center -gap-2 -p-2"
            onMouseDown={() => !disabled && inputRef.current?.focus()}
          >
            {selected.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className={cn(
                  '-group -pointer-events-auto -flex -h-6 -items-center -gap-1  -border-dashed -bg-muted -py-0 -pl-2 -pr-1.5 -text-muted-foreground',
                  option.fixed && '-border-transparent -pr-2',
                  badgeClassName,
                )}
              >
                {option.label}
                {!option.fixed && (
                  <button
                    className="-pointer-events-auto -ml-1.5 -inline-flex -h-full -cursor-pointer -items-center -justify-center -rounded-sm -opacity-50 -outline-none -transition-opacity -hover:-opacity-100 -hover:-bg-red-400 -p-1"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onClick={() => handleUnselect(option)}
                  >
                    <X className="-h-3 -w-3" />
                  </button>
                )}
              </Badge>
            ))}
            <CommandPrimitive.Input
              ref={inputRef}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder={disabled ? '' : selected.length > 0 && hidePlaceholderWhenSelected ? '' : placeholder}
              disabled={disabled}
              value={inputValue}
              onValueChange={setInputValue}
              onFocus={() => setOpen(true)}
              onBlur={(e) => {
                if (!mouseOn.current) setOpen(false);
                inputProps?.onBlur?.(e);
              }}
              className="-m-0 -h-auto -w-full -min-w-[8rem] -border-0 -bg-transparent -p-0 -text-sm -outline-none -focus:-ring-0 -disabled:-cursor-not-allowed -disabled:-opacity-50"
              {...inputProps}
            />
          </div>
          {!hideClearAllButton && selected.length > 0 && (
            <button
              className="-mr-2 -inline-flex -h-8 -w-8 -cursor-pointer -items-center -justify-center -rounded-sm -bg-muted -transition-all -hover:-bg-muted/80"
              onClick={() => {
                setSelected([]);
                onChange?.([]);
              }}
            >
              <X className="-h-3.5 -w-3.5 -text-muted-foreground" />
            </button>
          )}
        </div>
        {open && (
          <CommandList
            onMouseEnter={() => {
              mouseOn.current = true;
            }}
            onMouseLeave={() => {
              mouseOn.current = false;
            }}
            className="-absolute -top-full -z-50 -max-h-72 -w-full -overflow-y-auto -rounded-md -border -bg-popover -shadow-md -data-[cmdk-input-empty]:-h-10"
          >
            <EmptyItem />
            {isLoading && loadingIndicator && (
              <CommandItem value="-" disabled>
                {loadingIndicator}
              </CommandItem>
            )}
            {Object.entries(selectables).map(([key, value]) => {
              const groupItems = value.map((option, index) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disable}
                  className={cn(option.disable && '-opacity-50')}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={(val: string) => {
                    if (selected.length >= maxSelected) {
                      onMaxSelected?.(selected.length);
                      return;
                    }
                    setInputValue('');
                    const newOptions = [...selected, value.find((v) => v.value === val) as Option];
                    setSelected(newOptions);
                    onChange?.(newOptions);
                  }}
                >
                  {option.label}
                </CommandItem>
              ));

              return (
                <CommandGroup
                  key={key}
                  heading={key}
                  className={cn('-p-0 -group', value.length > 0 ? '-mb-2' : '-hidden')}
                >
                  {groupItems}
                </CommandGroup>
              );
            })}
            <CreatableItem />
          </CommandList>
        )}
      </Command>
    );
  },
);

MultipleSelector.displayName = 'MultipleSelector';

export default MultipleSelector;
