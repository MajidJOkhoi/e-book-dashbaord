import { getBooks } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { LoaderCircle, MoreHorizontalIcon, PlusCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book } from "@/types";
import { useNavigate } from "react-router-dom";

const ManageProject = () => {
  const navigate = useNavigate();

  const NavigateProjectPage = () => {
    navigate(`/dashboard/projects/create`);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 10000,
  });

  if (isLoading) {
    return (
      <div className="-flex -items-center -justify-center -min-h-screen">
        <LoaderCircle className="-h-10 -w-10 -animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="-flex -items-center -justify-center -min-h-screen">
        <p className="-text-red-500">An error occurred while fetching Projects.</p>
      </div>
    );
  }

  return (
    <>
      <div className="-flex -items-center -justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Projects</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={NavigateProjectPage}>
          <PlusCircle size={20} />
          <span className="-ml-2 "> Add Project </span>
        </Button>
      </div>

      <Card className="-mt-2 -w-full -max-w-sm sm:-max-w-full">
        <CardHeader>
          <CardTitle>All Projects </CardTitle>
          <CardDescription>
            Manage your Projects and view their Team performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="-w-[200px] sm:-table-cell">
                  <span className="-sr-only">Image</span>
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead className="-hidden md:-table-cell">Author Name</TableHead>
                <TableHead className="-hidden md:-table-cell">Created at</TableHead>
                <TableHead>
                  <span className="-sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((book: Book) => {
                return (
                  <TableRow key={book._id}>
                    <TableCell className="sm:-table-cell">
                      <img
                        alt={book.title}
                        className="-aspect-square -rounded-md -object-cover "
                        height="60"
                        src={book.coverImage}
                        width="50"
                      />
                    </TableCell>
                    <TableCell className="-font-medium">{book.title}</TableCell>
                    <TableCell>
                      <Badge variant={"outline"}> {book.genre} </Badge>
                    </TableCell>
                    <TableCell className="-hidden md:-table-cell">
                      {/* {book.author.name} */}
                    </TableCell>
                    <TableCell className="-hidden md:-table-cell">
                      {new Date(book.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Link to={`/dashboard/books/edit/${book._id}`}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </Link>
                          <Link to={`/dashboard/books/delete/${book._id}`}>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageProject;
