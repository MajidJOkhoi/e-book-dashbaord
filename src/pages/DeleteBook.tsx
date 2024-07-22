import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteBook } from '@/http/api';
import { LoaderCircle } from 'lucide-react';

const DeleteBook = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteBook(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            toast.success('Book deleted successfully');
            navigate('/dashboard/books');
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    const handleDelete = () => {
        {
            deleteMutation.mutate(id!);
        }
    };

    return (
        <section className="-flex -flex-col -items-center -justify-center -p-6 -mx-auto">
            <div className="-bg-white -shadow-sm -border-2 -rounded-lg -p-6 -w-full -max-w-md">
                <h2 className="-text-2xl -font-semibold -mb-4">Delete Book</h2>
                <p className="-text-gray-600 -mb-4">Are you sure you want to delete this book? This action cannot be undone.</p>
                <div className="-flex -gap-4">
                    <Button
                        variant={'outline'}
                        onClick={() => navigate('/dashboard/books')}
                        className="-w-full -max-w-xs"
                    >
                        Back
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="-w-full -max-w-xs -bg-red-500 -text-white hover:-bg-red-600"
                    >
                        {deleteMutation.isPending && <LoaderCircle className="-animate-spin -mr-2" />}
                        <span>Delete</span>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default DeleteBook;
