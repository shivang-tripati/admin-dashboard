import React from 'react'
import { Button } from './ui/button'
import { Product } from './product-table'
type props = {
    filteredProducts: Product[],
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({filteredProducts, currentPage, setCurrentPage}: props) => {
  return (
    <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-700">
            Showing 1 to 5 of {filteredProducts.length} results
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * 5 >= filteredProducts.length}
            >
              Next
            </Button>
          </div>
        </div>
  )
}

export default Pagination