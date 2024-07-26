import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
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

import MultipleSelector from '@/components/ui/MultipleSelector';
import { Option } from '@/components/ui/MultipleSelector';

import { useForm } from 'react-hook-form';
import { createBook } from '@/http/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
    assignedTo: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, {
        message: 'Please select at least one team member.',
    }),
    assignedBy: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, {
        message: 'Please select at least one team member.',
    }),
});

const teamMembersList: Option[] = [
    { label: 'Member 1', value: 'member1' },
    { label: 'Member 2', value: 'member2' },
    { label: 'Member 3', value: 'member3' },
    // Add more team members as needed
];
const TeamLeadList : Option[] = [

    { label: 'Team Lead 1', value: 'Team Lead 1' },
    { label: 'Team Lead 2', value: 'Team Lead 2' },
    { label: 'Team Lead 3', value: 'Team Lead 3' },
   
    // Add more team members as needed
];

const CreateProject = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            genre: '',
            description: '',
            assignedTo: [],
            assignedBy: [],
        },
    });

    const coverImageRef = form.register('coverImage');
    const fileRef = form.register('file');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast.success('Book created successfully');
            navigate('/dashboard/books');
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('genre', values.genre);
        formData.append('description', values.description);
        formData.append('coverImage', values.coverImage[0]);
        formData.append('file', values.file[0]);
        formData.append('assignedTo', JSON.stringify(values.assignedTo));
        formData.append('assignedBy', JSON.stringify(values.assignedBy));

        mutation.mutate(formData);
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
                                    <BreadcrumbLink href="/dashboard/projects">Project</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/projects">Cancel</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="-flex -items-center -gap-4">
                            <Link to="/dashboard/books">
                                <Button variant={'outline'}>
                                    <span className="-ml-2">Cancel</span>
                                </Button>
                            </Link>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <LoaderCircle className="-animate-spin" />}
                                <span className="-ml-2">Submit</span>
                            </Button>
                        </div>
                    </div>
                    <Card className="-mt-6">
                        <CardHeader>
                            <CardTitle>Create a new Project</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new Project.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="-grid -gap-6">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Title</FormLabel>
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
                                    name="assignedBy"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assigned By</FormLabel>
                                            <FormControl>
                                                <MultipleSelector
                                                    {...field}
                                                    defaultOptions={TeamLeadList}
                                                    placeholder="Select team members who assigned the project"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="assignedTo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assigned To</FormLabel>
                                            <FormControl>
                                                <MultipleSelector
                                                    {...field}
                                                    defaultOptions={teamMembersList}
                                                    placeholder="Select team members who will work on the project"
                                                />
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
                                            <FormLabel>Project Image</FormLabel>
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
                                            <FormLabel>Project File</FormLabel>
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

export default CreateProject;
