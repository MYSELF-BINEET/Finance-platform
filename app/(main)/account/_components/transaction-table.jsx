// "use client";

// import { useState, useEffect, useMemo } from "react";
// import {
//   ChevronDown,
//   ChevronUp,
//   MoreHorizontal,
//   Trash,
//   Search,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
//   Clock,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { categoryColors } from "@/data/categories";
// import { bulkDeleteTransactions } from "@/actions/account";
// import useFetch from "@/hooks/use-fetch";
// import { BarLoader } from "react-spinners";
// import { useRouter } from "next/navigation";

// const ITEMS_PER_PAGE = 10;

// const RECURRING_INTERVALS = {
//   DAILY: "Daily",
//   WEEKLY: "Weekly",
//   MONTHLY: "Monthly",
//   YEARLY: "Yearly",
// };

// export function TransactionTable({ transactions }) {
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [sortConfig, setSortConfig] = useState({
//     field: "date",
//     direction: "desc",
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [recurringFilter, setRecurringFilter] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const router = useRouter();

//   // Memoized filtered and sorted transactions
//   const filteredAndSortedTransactions = useMemo(() => {
//     let result = [...transactions];

//     // Apply search filter
//     if (searchTerm) {
//       const searchLower = searchTerm.toLowerCase();
//       result = result.filter((transaction) =>
//         transaction.description?.toLowerCase().includes(searchLower)
//       );
//     }

//     // Apply type filter
//     if (typeFilter) {
//       result = result.filter((transaction) => transaction.type === typeFilter);
//     }

//     // Apply recurring filter
//     if (recurringFilter) {
//       result = result.filter((transaction) => {
//         if (recurringFilter === "recurring") return transaction.isRecurring;
//         return !transaction.isRecurring;
//       });
//     }

//     // Apply sorting
//     result.sort((a, b) => {
//       let comparison = 0;

//       switch (sortConfig.field) {
//         case "date":
//           comparison = new Date(a.date) - new Date(b.date);
//           break;
//         case "amount":
//           comparison = a.amount - b.amount;
//           break;
//         case "category":
//           comparison = a.category.localeCompare(b.category);
//           break;
//         default:
//           comparison = 0;
//       }

//       return sortConfig.direction === "asc" ? comparison : -comparison;
//     });

//     return result;
//   }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

//   // Pagination calculations
//   const totalPages = Math.ceil(
//     filteredAndSortedTransactions.length / ITEMS_PER_PAGE
//   );
//   const paginatedTransactions = useMemo(() => {
//     const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAndSortedTransactions.slice(
//       startIndex,
//       startIndex + ITEMS_PER_PAGE
//     );
//   }, [filteredAndSortedTransactions, currentPage]);

//   const handleSort = (field) => {
//     setSortConfig((current) => ({
//       field,
//       direction:
//         current.field === field && current.direction === "asc" ? "desc" : "asc",
//     }));
//   };

//   const handleSelect = (id) => {
//     setSelectedIds((current) =>
//       current.includes(id)
//         ? current.filter((item) => item !== id)
//         : [...current, id]
//     );
//   };

//   const handleSelectAll = () => {
//     setSelectedIds((current) =>
//       current.length === paginatedTransactions.length
//         ? []
//         : paginatedTransactions.map((t) => t.id)
//     );
//   };

//   const {
//     loading: deleteLoading,
//     fn: deleteFn,
//     data: deleted,
//   } = useFetch(bulkDeleteTransactions);

//   const handleBulkDelete = async () => {
//     if (
//       !window.confirm(
//         `Are you sure you want to delete ${selectedIds.length} transactions?`
//       )
//     )
//       return;

//     deleteFn(selectedIds);
//   };

//   useEffect(() => {
//     if (deleted && !deleteLoading) {
//       toast.error("Transactions deleted successfully");
//     }
//   }, [deleted, deleteLoading]);

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setTypeFilter("");
//     setRecurringFilter("");
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     setSelectedIds([]); // Clear selections on page change
//   };

//   return (
//     <div className="space-y-4">
//       {deleteLoading && (
//         <BarLoader className="mt-4" width={"100%"} color="#9333ea" />
//       )}
//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search transactions..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="pl-8"
//           />
//         </div>
//         <div className="flex gap-2">
//           <Select
//             value={typeFilter}
//             onValueChange={(value) => {
//               setTypeFilter(value);
//               setCurrentPage(1);
//             }}
//           >
//             <SelectTrigger className="w-[130px]">
//               <SelectValue placeholder="All Types" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="INCOME">Income</SelectItem>
//               <SelectItem value="EXPENSE">Expense</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select
//             value={recurringFilter}
//             onValueChange={(value) => {
//               setRecurringFilter(value);
//               setCurrentPage(1);
//             }}
//           >
//             <SelectTrigger className="w-[130px]">
//               <SelectValue placeholder="All Transactions" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="recurring">Recurring Only</SelectItem>
//               <SelectItem value="non-recurring">Non-recurring Only</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Bulk Actions */}
//           {selectedIds.length > 0 && (
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={handleBulkDelete}
//               >
//                 <Trash className="h-4 w-4 mr-2" />
//                 Delete Selected ({selectedIds.length})
//               </Button>
//             </div>
//           )}

//           {(searchTerm || typeFilter || recurringFilter) && (
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleClearFilters}
//               title="Clear filters"
//             >
//               <X className="h-4 w-5" />
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Transactions Table */}
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">
//                 <Checkbox
//                   checked={
//                     selectedIds.length === paginatedTransactions.length &&
//                     paginatedTransactions.length > 0
//                   }
//                   onCheckedChange={handleSelectAll}
//                 />
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer"
//                 onClick={() => handleSort("date")}
//               >
//                 <div className="flex items-center">
//                   Date
//                   {sortConfig.field === "date" &&
//                     (sortConfig.direction === "asc" ? (
//                       <ChevronUp className="ml-1 h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="ml-1 h-4 w-4" />
//                     ))}
//                 </div>
//               </TableHead>
//               <TableHead>Description</TableHead>
//               <TableHead
//                 className="cursor-pointer"
//                 onClick={() => handleSort("category")}
//               >
//                 <div className="flex items-center">
//                   Category
//                   {sortConfig.field === "category" &&
//                     (sortConfig.direction === "asc" ? (
//                       <ChevronUp className="ml-1 h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="ml-1 h-4 w-4" />
//                     ))}
//                 </div>
//               </TableHead>
//               <TableHead
//                 className="cursor-pointer text-right"
//                 onClick={() => handleSort("amount")}
//               >
//                 <div className="flex items-center justify-end">
//                   Amount
//                   {sortConfig.field === "amount" &&
//                     (sortConfig.direction === "asc" ? (
//                       <ChevronUp className="ml-1 h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="ml-1 h-4 w-4" />
//                     ))}
//                 </div>
//               </TableHead>
//               <TableHead>Recurring</TableHead>
//               <TableHead className="w-[50px]" />
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedTransactions.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={7}
//                   className="text-center text-muted-foreground"
//                 >
//                   No transactions found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedTransactions.map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selectedIds.includes(transaction.id)}
//                       onCheckedChange={() => handleSelect(transaction.id)}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     {format(new Date(transaction.date), "PP")}
//                   </TableCell>
//                   <TableCell>{transaction.description}</TableCell>
//                   <TableCell className="capitalize">
//                     <span
//                       style={{
//                         background: categoryColors[transaction.category],
//                       }}
//                       className="px-2 py-1 rounded text-white text-sm"
//                     >
//                       {transaction.category}
//                     </span>
//                   </TableCell>
//                   <TableCell
//                     className={cn(
//                       "text-right font-medium",
//                       transaction.type === "EXPENSE"
//                         ? "text-red-500"
//                         : "text-green-500"
//                     )}
//                   >
//                     {transaction.type === "EXPENSE" ? "-" : "+"}$
//                     {transaction.amount.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     {transaction.isRecurring ? (
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger>
//                             <Badge
//                               variant="secondary"
//                               className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
//                             >
//                               <RefreshCw className="h-3 w-3" />
//                               {
//                                 RECURRING_INTERVALS[
//                                   transaction.recurringInterval
//                                 ]
//                               }
//                             </Badge>
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <div className="text-sm">
//                               <div className="font-medium">Next Date:</div>
//                               <div>
//                                 {format(
//                                   new Date(transaction.nextRecurringDate),
//                                   "PPP"
//                                 )}
//                               </div>
//                             </div>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     ) : (
//                       <Badge variant="outline" className="gap-1">
//                         <Clock className="h-3 w-3" />
//                         One-time
//                       </Badge>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() =>
//                             router.push(
//                               `/transaction/create?edit=${transaction.id}`
//                             )
//                           }
//                         >
//                           Edit
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           className="text-destructive"
//                           onClick={() => deleteFn([transaction.id])}
//                         >
//                           Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2">
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <span className="text-sm">
//             Page {currentPage} of {totalPages}
//           </span>
//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/account";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export function TransactionTable({ transactions }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  // Memoized filtered and sorted transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    // Apply recurring filter
    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === paginatedTransactions.length
        ? []
        : paginatedTransactions.map((t) => t.id)
    );
  };

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;

    deleteFn(selectedIds);
  };

  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.error("Transactions deleted successfully");
    }
  }, [deleted, deleteLoading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedIds([]); // Clear selections on page change
  };

  return (
    <div className="space-y-4 bg-gray-950 text-gray-100">
      {deleteLoading && (
        <div className="flex justify-center items-center py-4">
          <BarLoader width={"100%"} color="#A855F7" />
        </div>
      )}
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="INCOME" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700">
                Income
              </SelectItem>
              <SelectItem value="EXPENSE" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700">
                Expense
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700 text-gray-100">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="recurring" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700">
                Recurring Only
              </SelectItem>
              <SelectItem value="non-recurring" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700">
                Non-recurring Only
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            </div>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear filters"
              className="bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="w-[50px] text-gray-300">
                <Checkbox
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer text-gray-300 hover:text-gray-100 transition-colors"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 text-purple-400" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-gray-300">Description</TableHead>
              <TableHead
                className="cursor-pointer text-gray-300 hover:text-gray-100 transition-colors"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 text-purple-400" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-right text-gray-300 hover:text-gray-100 transition-colors"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4 text-purple-400" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 text-purple-400" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="text-gray-300">Recurring</TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-gray-400 py-12"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-gray-800 hover:bg-gray-800/30 transition-colors">
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(transaction.id)}
                      onCheckedChange={() => handleSelect(transaction.id)}
                      className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>
                  <TableCell className="text-gray-100 font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className="capitalize">
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="px-3 py-1 rounded-full text-white text-sm font-medium shadow-sm"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-bold text-lg",
                      transaction.type === "EXPENSE"
                        ? "text-red-400"
                        : "text-green-400"
                    )}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="secondary"
                              className="gap-1 bg-purple-900/50 text-purple-300 hover:bg-purple-900/70 border-purple-800"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 border-gray-700 text-gray-100">
                            <div className="text-sm">
                              <div className="font-medium">Next Date:</div>
                              <div>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  "PPP"
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge variant="outline" className="gap-1 bg-gray-800/50 text-gray-400 border-gray-700">
                        <Clock className="h-3 w-3" />
                        One-time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-100 hover:bg-gray-800">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                          className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700"
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-red-900/20 focus:bg-red-900/20"
                          onClick={() => deleteFn([transaction.id])}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-300 px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}