"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Button } from "./ui/button";
import { MoreHorizontalIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export interface Product {
  id: number;
  name: string;
  status: string,
  price: number;
  totalSales: number;
  createdAt: string;
  imageUrl: string;
}

type Props = {
  products: Product[];
};

const ProductTable = ({ products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    if(products.length < 5){
      setItemsPerPage(products.length)
    }
    setFilteredProducts(products.slice(start, end));
  }, [currentPage, itemsPerPage, products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white rounded-lg shadow flex-1 h-full">
        <div className="p-6">
          <h1 className="text-2xl text-black font-bold">Products</h1>
          <p className="text-gray-500">Manage your products and view their sales performance.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-200">
                  <TableCell className="flex items-center space-x-3">
                  <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="font-medium text-base text-gray-700">{product.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-semibold rounded-full border-gray-460 text-gray-700"
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-700">{product.totalSales}</TableCell>
                  <TableCell className="text-gray-700">{product.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 bg-white border-t">
          <p className="text-gray-500 text-sm">
            Showing{" "}
            <span className="font-semibold">
              {currentPage * itemsPerPage - itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, products.length)}
            </span>{" "}
            of <span className="font-semibold">{products.length}</span> products
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <span className="text-gray-700 text-sm">Page {currentPage} of {totalPages}</span>
            <Button
              variant="secondary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
