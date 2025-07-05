// "use client";

// import { useState, useEffect } from "react";
// import { Pencil, Check, X } from "lucide-react";
// import useFetch from "@/hooks/use-fetch";
// import { toast } from "sonner";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { updateBudget } from "@/actions/budget";

// export function BudgetProgress({ initialBudget, currentExpenses }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [newBudget, setNewBudget] = useState(
//     initialBudget?.amount?.toString() || ""
//   );

//   const {
//     loading: isLoading,
//     fn: updateBudgetFn,
//     data: updatedBudget,
//     error,
//   } = useFetch(updateBudget);

//   const percentUsed = initialBudget
//     ? (currentExpenses / initialBudget.amount) * 100
//     : 0;

//   const handleUpdateBudget = async () => {
//     const amount = parseFloat(newBudget);

//     if (isNaN(amount) || amount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     await updateBudgetFn(amount);
//   };

//   const handleCancel = () => {
//     setNewBudget(initialBudget?.amount?.toString() || "");
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     if (updatedBudget?.success) {
//       setIsEditing(false);
//       toast.success("Budget updated successfully");
//     }
//   }, [updatedBudget]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message || "Failed to update budget");
//     }
//   }, [error]);

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <div className="flex-1">
//           <CardTitle className="text-sm font-medium">
//             Monthly Budget (Default Account)
//           </CardTitle>
//           <div className="flex items-center gap-2 mt-1">
//             {isEditing ? (
//               <div className="flex items-center gap-2">
//                 <Input
//                   type="number"
//                   value={newBudget}
//                   onChange={(e) => setNewBudget(e.target.value)}
//                   className="w-32"
//                   placeholder="Enter amount"
//                   autoFocus
//                   disabled={isLoading}
//                 />
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleUpdateBudget}
//                   disabled={isLoading}
//                 >
//                   <Check className="h-4 w-4 text-green-500" />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={handleCancel}
//                   disabled={isLoading}
//                 >
//                   <X className="h-4 w-4 text-red-500" />
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <CardDescription>
//                   {initialBudget
//                     ? `$${currentExpenses.toFixed(
//                         2
//                       )} of $${initialBudget.amount.toFixed(2)} spent`
//                     : "No budget set"}
//                 </CardDescription>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setIsEditing(true)}
//                   className="h-6 w-6"
//                 >
//                   <Pencil className="h-3 w-3" />
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         {initialBudget && (
//           <div className="space-y-2">
//             <Progress
//               value={percentUsed}
//               extraStyles={`${
//                 // add to Progress component
//                 percentUsed >= 90
//                   ? "bg-red-500"
//                   : percentUsed >= 75
//                     ? "bg-yellow-500"
//                     : "bg-green-500"
//               }`}
//             />
//             <p className="text-xs text-muted-foreground text-right">
//               {percentUsed.toFixed(1)}% used
//             </p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X, TrendingUp, AlertTriangle, DollarSign, Target } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );
  const [isHovered, setIsHovered] = useState(false);

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const remainingBudget = initialBudget ? initialBudget.amount - currentExpenses : 0;
  const isOverBudget = percentUsed > 100;
  const isNearLimit = percentUsed >= 90;
  const isWarning = percentUsed >= 75;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  const getStatusColor = () => {
    if (isOverBudget) return "from-red-500 to-red-600";
    if (isNearLimit) return "from-orange-500 to-red-500";
    if (isWarning) return "from-yellow-500 to-orange-500";
    return "from-emerald-500 to-green-500";
  };

  const getStatusIcon = () => {
    if (isOverBudget) return <AlertTriangle className="h-4 w-5 text-red-400" />;
    if (isNearLimit) return <AlertTriangle className="h-4 w-4 text-orange-400" />;
    if (isWarning) return <TrendingUp className="h-4 w-4 text-yellow-400" />;
    return <Target className="h-4 w-4 text-green-400" />;
  };

  const getStatusText = () => {
    if (isOverBudget) return "Over Budget";
    if (isNearLimit) return "Near Limit";
    if (isWarning) return "Watch Spending";
    return "On Track";
  };

  return (
    <div className="relative w-full h-full">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Card 
        className="relative overflow-hidden border-0 shadow-2xl transition-all duration-700 hover:shadow-purple-500/25 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl w-full h-full flex flex-col"
        style={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(147, 51, 234, 0.3)' 
            : '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-lg blur-sm" />
        <div className="absolute inset-[1px] bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-black/95 rounded-lg" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 animate-pulse" />
        
        {/* Glass Effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Animated Progress Ring */}
        <div className="absolute top-6 right-6 w-20 h-20 z-10">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="100, 100"
              className="text-gray-600/50"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${Math.min(percentUsed, 100)}, 100`}
              className={`transition-all duration-2000 ${
                isOverBudget ? 'text-red-400' : 
                isNearLimit ? 'text-orange-400' : 
                isWarning ? 'text-yellow-400' : 'text-green-400'
              }`}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 6px currentColor)'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-white/90">
              {percentUsed.toFixed(0)}%
            </span>
          </div>
        </div>

        <CardHeader className="relative z-10 pb-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl blur-sm" />
                <DollarSign className="h-6 w-6 text-purple-400 relative z-10" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white mb-1">
                  Monthly Budget
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Default Account
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mr-20">
              {getStatusIcon()}
              <span className={`text-sm font-medium px-3 py-1 rounded-full border ${
                isOverBudget ? 'text-red-400 border-red-500/30 bg-red-500/10' : 
                isNearLimit ? 'text-orange-400 border-orange-500/30 bg-orange-500/10' : 
                isWarning ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' : 
                'text-green-400 border-green-500/30 bg-green-500/10'
              }`}>
                {getStatusText()}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 flex-1 flex flex-col justify-center space-y-8">
          {/* Budget Amount Section */}
          <div className="space-y-4">
            {isEditing ? (
              <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="flex-1 border-gray-600/50 bg-gray-900/50 text-white text-lg font-semibold placeholder-gray-500 focus:border-purple-500/50 focus:ring-purple-500/50"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  className="h-12 w-12 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 transition-all duration-200 hover:scale-105"
                >
                  <Check className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="h-12 w-12 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all duration-200 hover:scale-105"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800/60 to-gray-900/60 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Current Budget</p>
                  <p className="text-3xl font-bold text-white">
                    ${initialBudget ? initialBudget.amount.toLocaleString() : '0'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-12 w-12 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 transition-all duration-200 hover:scale-105"
                >
                  <Pencil className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>

          {/* Expenses Overview */}
          {initialBudget && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gray-800/40 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">Spent</p>
                <p className="text-2xl font-bold text-white">
                  ${currentExpenses.toLocaleString()}
                </p>
                <div className="h-1 bg-gray-700/50 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  />
                </div>
              </div>
              <div className="p-6 bg-gray-800/40 rounded-2xl backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <p className="text-sm text-gray-400 mb-2">
                  {isOverBudget ? 'Over by' : 'Remaining'}
                </p>
                <p className={`text-2xl font-bold ${
                  isOverBudget ? 'text-red-400' : 'text-green-400'
                }`}>
                  ${Math.abs(remainingBudget).toLocaleString()}
                </p>
                <div className="h-1 bg-gray-700/50 rounded-full mt-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      isOverBudget ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-emerald-500'
                    }`}
                    style={{ width: isOverBudget ? '100%' : `${100 - percentUsed}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Progress Bar */}
          {initialBudget && (
            <div className="space-y-4">
              <div className="relative h-4 bg-gray-800/60 rounded-full overflow-hidden border border-gray-700/50">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getStatusColor()} transition-all duration-2000 ease-out rounded-full`}
                  style={{ width: `${Math.min(percentUsed, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {isOverBudget && (
                  <div className="absolute inset-0 bg-red-500/60 animate-pulse rounded-full" />
                )}
                
                {/* Progress Indicator */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 w-3 h-6 transition-all duration-2000"
                  style={{ left: `${Math.min(percentUsed, 100)}%` }}
                >
                  <div className="w-full h-full bg-white rounded-full shadow-lg border-2 border-gray-300" />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-gray-300">
                    Progress: {percentUsed.toFixed(1)}%
                  </span>
                </div>
                <span className={`font-medium px-3 py-1 rounded-full ${
                  isOverBudget ? 'text-red-400 bg-red-500/10' : 'text-green-400 bg-green-500/10'
                }`}>
                  {isOverBudget ? `${(percentUsed - 100).toFixed(1)}% over limit` : 'Within budget'}
                </span>
              </div>
            </div>
          )}

          {/* No Budget Set State */}
          {!initialBudget && (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
                <Target className="h-10 w-10 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  No Budget Set
                </h3>
                <p className="text-gray-400">
                  Set a monthly budget to track your spending progress and achieve your financial goals
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
          isHovered ? 'shadow-[0_0_30px_rgba(147,51,234,0.3)]' : ''
        }`} />
      </Card>
    </div>
  );
}