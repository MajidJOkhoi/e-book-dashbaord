import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { createBook, getBookById, editBook } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    genre: z.string().min(2, {
        message: 'Genre must be at least 2 characters.',
    }),
    description: z.string().min(2, {
        message: 'Description must be at least 2 characters.',
    }),
    coverImage: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Cover Image is required'),
    file: z.instanceof(FileList).refine((file) => {
        return file.length == 1;
    }, 'Book PDF is required'),
});

const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            genre: '',
            description: '',
        },
    });

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast.success('Book created successfully');
            navigate('/dashboard/books');
        },
    });

    const editMutation = useMutation({
        mutationFn: (data) => editBook(id!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            console.log('Book updated successfully');
            navigate('/dashboard/books');
        },
    });

    useEffect(() => {
        if (isEditMode) {
            getBookById(id!).then((data) => {
                form.setValue('title', data.title);
                form.setValue('genre', data.genre);
                form.setValue('description', data.description);
             
            });
        }
    }, [id, isEditMode, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formdata = new FormData();
        formdata.append('title', values.title);
        formdata.append('genre', values.genre);
        formdata.append('description', values.description);
        formdata.append('coverImage', values.coverImage[0]);
        formdata.append('file', values.file[0]);

        if (isEditMode) {
            editMutation.mutate(formdata);
        } else {
            createMutation.mutate(formdata);
        }

        console.log(values);
    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="-flex -items-center -justify-between">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{isEditMode ? 'Edit' : 'Create'}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="-flex -items-center -gap-4">
                            <Link to="/dashboard/books">
                                <Button variant={'outline'}>
                                    <span className="-ml-2">Cancel</span>
                                </Button>
                            </Link>
                            <Button type="submit" disabled={createMutation.isPending || editMutation.isPending}>
                                {(createMutation.isPending || editMutation.isPending) && <LoaderCircle className="-animate-spin" />}
                                <span className="-ml-2">Submit</span>
                            </Button>
                        </div>
                    </div>
                    <Card className="-mt-6">
                        <CardHeader>
                            <CardTitle>{isEditMode ? 'Edit the book' : 'Create a new book'}</CardTitle>
                            <CardDescription>
                                Fill out the form below to {isEditMode ? 'edit' : 'create'} the book.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="-grid -gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="-w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="genre"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Genre</FormLabel>
                                            <FormControl>
                                                <Input type="text" className="-w-full" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea className="-min-h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="coverImage"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="-w-full"
                                                    {...coverImageRef}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Book File</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    className="-w-full"
                                                    {...fileRef}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </section>
    );
};

export default EditBook;
