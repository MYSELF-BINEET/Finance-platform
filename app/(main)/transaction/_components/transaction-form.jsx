"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, TrendingUp, TrendingDown, DollarSign, CreditCard, Repeat, Sparkles, Receipt, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");
  const amount = watch("amount");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const getTransactionColor = () => {
    return type === "INCOME" ? "from-green-500 to-emerald-600" : "from-red-500 to-rose-600";
  };

  const getTransactionIcon = () => {
    return type === "INCOME" ? TrendingUp : TrendingDown;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${getTransactionColor()} shadow-lg`}>
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {editMode ? "Edit Transaction" : "Create New Transaction"}
                  </h1>
                  <p className="text-gray-400">
                    {editMode ? "Update your transaction details" : "Add a new transaction to your account"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Transaction Type */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${getTransactionColor()}/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getTransactionColor()}`}>
                    {React.createElement(getTransactionIcon(), { className: "h-5 w-5 text-white" })}
                  </div>
                  <label className="text-lg font-semibold text-white">Transaction Type</label>
                </div>
                <Select
                  onValueChange={(value) => setValue("type", value)}
                  defaultValue={type}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:ring-purple-400/20">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="EXPENSE" className="text-white hover:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-red-400" />
                        Expense
                      </div>
                    </SelectItem>
                    <SelectItem value="INCOME" className="text-white hover:bg-gray-700">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        Income
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {errors.type.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Amount and Account */}
          <div className={`grid gap-6 md:grid-cols-2 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Amount */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-white">Amount</label>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("amount")}
                    className="bg-gray-800/50 border-gray-600 text-white text-xl font-bold placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 pl-12"
                  />
                  <DollarSign className="absolute left-3 top-3 h-6 w-6 text-yellow-400" />
                  {amount && (
                    <div className="absolute right-3 top-3 text-sm text-gray-400">
                      {type === "INCOME" ? "+" : "-"}${parseFloat(amount || 0).toFixed(2)}
                    </div>
                  )}
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {errors.amount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Account */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-white">Account</label>
                </div>
                <Select
                  onValueChange={(value) => setValue("accountId", value)}
                  defaultValue={getValues("accountId")}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-blue-400 focus:ring-blue-400/20">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id} className="text-white hover:bg-gray-700">
                        <div className="flex items-center justify-between w-full">
                          <span>{account.name}</span>
                          <span className="text-gray-400 ml-2">${parseFloat(account.balance).toFixed(2)}</span>
                        </div>
                      </SelectItem>
                    ))}
                    <CreateAccountDrawer>
                      <Button
                        variant="ghost"
                        className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-700 hover:text-white text-cyan-400"
                      >
                        + Create Account
                      </Button>
                    </CreateAccountDrawer>
                  </SelectContent>
                </Select>
                {errors.accountId && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {errors.accountId.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-indigo-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-white">Category</label>
                </div>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  defaultValue={getValues("category")}
                >
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-indigo-400 focus:ring-indigo-400/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {filteredCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id} className="text-white hover:bg-gray-700">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Date */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-pink-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500">
                    <CalendarIcon className="h-5 w-5 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-white">Date</label>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-4 text-left font-normal bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 focus:border-pink-400 focus:ring-pink-400/20",
                        !date && "text-gray-400"
                      )}
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => setValue("date", date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-teal-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <label className="text-lg font-semibold text-white">Description</label>
                </div>
                <Input 
                  placeholder="Enter description" 
                  {...register("description")}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-teal-400 focus:ring-teal-400/20"
                />
                {errors.description && (
                  <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recurring Toggle */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-violet-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                      <Repeat className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <label className="text-lg font-semibold text-white">Recurring Transaction</label>
                      <div className="text-sm text-gray-400">
                        Set up a recurring schedule for this transaction
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={isRecurring}
                    onCheckedChange={(checked) => setValue("isRecurring", checked)}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-violet-500 data-[state=checked]:to-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recurring Interval */}
          {isRecurring && (
            <div className={`transition-all duration-500 ${isRecurring ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                      <Repeat className="h-5 w-5 text-white" />
                    </div>
                    <label className="text-lg font-semibold text-white">Recurring Interval</label>
                  </div>
                  <Select
                    onValueChange={(value) => setValue("recurringInterval", value)}
                    defaultValue={getValues("recurringInterval")}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white focus:border-emerald-400 focus:ring-emerald-400/20">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="DAILY" className="text-white hover:bg-gray-700">Daily</SelectItem>
                      <SelectItem value="WEEKLY" className="text-white hover:bg-gray-700">Weekly</SelectItem>
                      <SelectItem value="MONTHLY" className="text-white hover:bg-gray-700">Monthly</SelectItem>
                      <SelectItem value="YEARLY" className="text-white hover:bg-gray-700">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.recurringInterval && (
                    <p className="text-sm text-red-400 mt-2 flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {errors.recurringInterval.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className={`flex gap-4 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className={`w-full bg-gradient-to-r ${getTransactionColor()} hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105`}
              disabled={transactionLoading}
            >
              {transactionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {editMode ? "Update Transaction" : "Create Transaction"}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}