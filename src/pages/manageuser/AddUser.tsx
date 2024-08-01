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
    fullName: z.string().min(2, {
        message: 'Full name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Invalid email address.',
    }),
    jobType: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, {
        message: 'Please select at least one job type.',
    }),
    role: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).min(1, {
        message: 'Please select at least one role.',
    }),
    address: z.string().min(2, {
        message: 'Address must be at least 2 characters.',
    }),
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
});

const jobTypeList: Option[] = [
    { label: 'Full-Time', value: 'full_time' },
    { label: 'Part-Time', value: 'part_time' },
    { label: 'Contract', value: 'contract' },
    // Add more job types as needed
];

const roleList: Option[] = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
    // Add more roles as needed
];

const AddUser = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            jobType: [],
            role: [],
            address: '',
            username: '',
            password: '',
        },
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createBook, // Update this to your API call
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] }); // Update this to your query key
            toast.success('User created successfully');
            navigate('/dashboard/users'); // Update this to your desired route
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('fullName', values.fullName);
        formData.append('email', values.email);
        formData.append('jobType', JSON.stringify(values.jobType));
        formData.append('role', JSON.stringify(values.role));
        formData.append('address', values.address);
        formData.append('username', values.username);
        formData.append('password', values.password);

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
                                    <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/users">Cancel</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="-flex -items-center -gap-4">
                            <Link to="/dashboard/users">
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
                            <CardTitle>Create a new User</CardTitle>
                            <CardDescription>
                                Fill out the form below to create a new user.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="-grid -gap-6">
                                <div className="-flex -gap-4 -flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem className="-flex-1">
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="-w-full" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="-flex-1">
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" className="-w-full" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                               
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea className="-min-h-32" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="-flex -gap-4 -flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="-flex-1">
                                                <FormLabel>Username</FormLabel>
                                                <FormControl>
                                                    <Input type="text" className="-w-full" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="-flex-1">
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" className="-w-full" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                 <div className="-flex -gap-4 -flex-wrap">
                                    <FormField
                                        control={form.control}
                                        name="jobType"
                                        render={({ field }) => (
                                            <FormItem className="-flex-1">
                                                <FormLabel>Job Type</FormLabel>
                                                <FormControl>
                                                    <MultipleSelector
                                                        {...field}
                                                        defaultOptions={jobTypeList}
                                                        placeholder="Select job type"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem className="-flex-1 -w-8">
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <MultipleSelector
                                                        {...field}
                                                        defaultOptions={roleList}
                                                        placeholder="Select role"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </section>
    );
};

export default AddUser;
