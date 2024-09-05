"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { products as initialProducts } from "@/lib/data";
import { ChevronRight, Search } from "lucide-react";
import { Product } from "./product-table";
import ProductTable from "./product-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserCircle2Icon } from "lucide-react";

const Dashboard = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentFilter, setCurrentFilter] = useState("All");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };
  const handleFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    let filtered = initialProducts;    
    if (currentFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.status === currentFilter
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered.map((product) => ({
        ...product,
        status: product.status as "Active" | "Draft" | "Archived",
      })));  },
      
    [searchQuery, currentFilter]);

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4">
        {/* Breadcrumb */}
        <nav className="flex text-sm mb-4 ml-5 justify-between">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-gray-500">
                Dashboard
              </a>
              <ChevronRight className="h-6 w-4 mx-2 text-gray-400" />
            </li>
            <li className="flex items-center">
              <a href="#" className="text-gray-500">
                Products
              </a>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            </li>
            <li className="flex items-center">
              <span className="text-gray-900">All Products</span>
            </li>
          </ol>
          <div className="relative flex gap-x-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products"
              className="pl-8 text-black"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
    
            <UserCircle2Icon 
          className="h-10 w-10 cursor-pointer text-gray-600" 
          onClick={toggleUserMenu}
        />
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-10 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <a href="/account" className="block font-bold px-4 py-2 text-gray-900 hover:bg-gray-100">My Account</a>
            <div className="border-t border-gray-200"></div>
            <div className="py-1">
            <a href="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settingst</a>
              <a href="/support" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Support</a>
              <a href="/signin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sign In</a>
            </div>
          </div>
        )}
          </div>
          
        </nav>

        {/* Top Bar */}
        <div className="flex flex-row items-center justify-between items-center mb-6 ">
        <div className="flex space-x-2 mb-4 items-center">
            {["All", "Active", "Draft", "Archived"].map((filter) => (
              <Button
                key={filter}
                variant={currentFilter === filter ? "default" : "secondary"}
                onClick={() => handleFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
          
            <Button variant="default">Export</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Product</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] sm:rounded-lg sm:p-6 bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new product.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-3"
                      placeholder="Product name"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      className="col-span-3"
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <select
                      id="status"
                      className="col-span-3 border rounded-md p-2"
                    >
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Table */}
        <ProductTable products={filteredProducts} />
      </main>
    </div>
  );
};

export default Dashboard;
