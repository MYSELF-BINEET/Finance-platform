"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard, Star, Wallet, TrendingUp, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;
  const [isHovered, setIsHovered] = useState(false);

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  // Get account type icon
  const getAccountTypeIcon = () => {
    switch (type.toLowerCase()) {
      case 'checking':
        return <CreditCard className="h-5 w-5" />;
      case 'savings':
        return <Wallet className="h-5 w-5" />;
      case 'investment':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getAccountTypeColor = () => {
    switch (type.toLowerCase()) {
      case 'checking':
        return 'text-blue-400';
      case 'savings':
        return 'text-green-400';
      case 'investment':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatBalance = (balance) => {
    const num = parseFloat(balance);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  return (
    <Card 
      className={`relative bg-gray-900 border-gray-800 transition-all duration-300 cursor-pointer group ${
        isHovered ? 'shadow-xl shadow-gray-900/50 border-gray-700' : 'hover:shadow-lg hover:shadow-gray-900/30'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default Account Badge */}
      {isDefault && (
        <div className="absolute top-4 right-4 z-20">
          <Badge className="bg-yellow-600 text-white border-0">
            <Star className="h-3 w-3 mr-1" />
            Default
          </Badge>
        </div>
      )}

      <Link href={`/account/${id}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg bg-gray-800 ${getAccountTypeColor()} transition-colors duration-300`}>
                {getAccountTypeIcon()}
              </div>
              <div>
                <CardTitle className="text-lg font-semibold capitalize text-white">
                  {name}
                </CardTitle>
                <p className="text-sm text-gray-400">
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Account
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-4">
          <div className="space-y-4">
            {/* Balance Display */}
            <div className="text-center p-4 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Current Balance</p>
              <div className="text-3xl font-bold text-white">
                {formatBalance(balance)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {parseFloat(balance) >= 0 ? 'Available' : 'Overdrawn'}
              </p>
            </div>

            {/* Account Status */}
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Active</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-1 text-blue-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Synced</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <div className="w-full space-y-3">
            {/* Income/Expense Indicators */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                <ArrowUpRight className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Income</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                <ArrowDownRight className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Expense</span>
              </div>
            </div>

            {/* Default Account Toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">
                  Default Account
                </span>
              </div>
              <Switch
                checked={isDefault}
                onClick={handleDefaultChange}
                disabled={updateDefaultLoading}
                className="data-[state=checked]:bg-yellow-600"
              />
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}