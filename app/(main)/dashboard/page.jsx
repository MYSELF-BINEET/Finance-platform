// // import { Suspense } from "react";
// // import { getUserAccounts } from "@/actions/dashboard";
// // import { getDashboardData } from "@/actions/dashboard";
// // import { getCurrentBudget } from "@/actions/budget";
// // import { AccountCard } from "./_components/account-card";
// // import { CreateAccountDrawer } from "@/components/create-account-drawer";
// // import { BudgetProgress } from "./_components/budget-progress";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Plus } from "lucide-react";
// // import { DashboardOverview } from "./_components/transaction-overview";

// // export default async function DashboardPage() {
// //   const [accounts, transactions] = await Promise.all([
// //     getUserAccounts(),
// //     getDashboardData(),
// //   ]);

// //   const defaultAccount = accounts?.find((account) => account.isDefault);

// //   // Get budget for default account
// //   let budgetData = null;
// //   if (defaultAccount) {
// //     budgetData = await getCurrentBudget(defaultAccount.id);
// //   }

// //   return (
// //     <div className="space-y-8">
// //       {/* Budget Progress */}
// //       <BudgetProgress
// //         initialBudget={budgetData?.budget}
// //         currentExpenses={budgetData?.currentExpenses || 0}
// //       />

// //       {/* Dashboard Overview */}
// //       <DashboardOverview
// //         accounts={accounts}
// //         transactions={transactions || []}
// //       />

// //       {/* Accounts Grid */}
// //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //         <CreateAccountDrawer>
// //           <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
// //             <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
// //               <Plus className="h-10 w-10 mb-2" />
// //               <p className="text-sm font-medium">Add New Account</p>
// //             </CardContent>
// //           </Card>
// //         </CreateAccountDrawer>
// //         {accounts.length > 0 &&
// //           accounts?.map((account) => (
// //             <AccountCard key={account.id} account={account} />
// //           ))}
// //       </div>
// //     </div>
// //   );
// // }


// import { Suspense } from "react";
// import { getUserAccounts } from "@/actions/dashboard";
// import { getDashboardData } from "@/actions/dashboard";
// import { getCurrentBudget } from "@/actions/budget";
// import { AccountCard } from "./_components/account-card";
// import { CreateAccountDrawer } from "@/components/create-account-drawer";
// import { BudgetProgress } from "./_components/budget-progress";
// import { Card, CardContent } from "@/components/ui/card";
// import { Plus } from "lucide-react";
// import { DashboardOverview } from "./_components/transaction-overview";

// export default async function DashboardPage() {
//   const [accounts, transactions] = await Promise.all([
//     getUserAccounts(),
//     getDashboardData(),
//   ]);

//   const defaultAccount = accounts?.find((account) => account.isDefault);

//   // Get budget for default account
//   let budgetData = null;
//   if (defaultAccount) {
//     budgetData = await getCurrentBudget(defaultAccount.id);
//   }

//   return (
//     <div className="space-y-10">
//       {/* Budget Progress */}
//       <div className="rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-950 transition-colors duration-500">
//         <BudgetProgress
//           initialBudget={budgetData?.budget}
//           currentExpenses={budgetData?.currentExpenses || 0}
//         />
//       </div>

//       {/* Dashboard Overview */}
//       <div className="rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-950 transition-colors duration-500">
//         <DashboardOverview
//           accounts={accounts}
//           transactions={transactions || []}
//         />
//       </div>

//       {/* Accounts Grid */}
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <CreateAccountDrawer>
//           <Card className="hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border-dashed bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 text-white">
//             <CardContent className="flex flex-col items-center justify-center h-40 md:h-48">
//               <Plus className="h-10 w-10 mb-2" />
//               <p className="text-sm font-semibold">Add New Account</p>
//             </CardContent>
//           </Card>
//         </CreateAccountDrawer>

//         {accounts.length > 0 &&
//           accounts.map((account) => (
//             <div
//               key={account.id}
//               className="hover:shadow-xl hover:scale-[1.02] transition-all"
//             >
//               <AccountCard account={account} />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }


import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8 relative">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-60 right-10 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Budget Progress Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-cyan-500/50 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">💰</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Budget Overview</h2>
              <p className="text-white/60 text-sm">Track your financial progress</p>
            </div>
          </div>
          <BudgetProgress
            initialBudget={budgetData?.budget}
            currentExpenses={budgetData?.currentExpenses || 0}
          />
        </div>
      </div>

      {/* Dashboard Overview Section */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-indigo-500/50 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">📈</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
              <p className="text-white/60 text-sm">Comprehensive financial insights</p>
            </div>
          </div>
          <DashboardOverview
            accounts={accounts}
            transactions={transactions || []}
          />
        </div>
      </div>

      {/* Accounts Grid Section */}
      <div className="relative">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">🏦</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Your Accounts</h2>
            <p className="text-white/60 text-sm">Manage all your financial accounts</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Create Account Card */}
          <CreateAccountDrawer>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
              <Card className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl hover:scale-105 transition-all duration-500 shadow-2xl group-hover:shadow-purple-500/20">
                <CardContent className="flex flex-col items-center justify-center h-48 text-white">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold mb-2">Add New Account</p>
                  <p className="text-white/60 text-sm text-center">Create a new financial account</p>
                  
                  {/* Floating particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                </CardContent>
              </Card>
            </div>
          </CreateAccountDrawer>

          {/* Account Cards */}
          {accounts.length > 0 &&
            accounts.map((account, index) => (
              <div
                key={account.id}
                className="relative group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl hover:scale-105 transition-all duration-500 shadow-2xl group-hover:shadow-cyan-500/20 overflow-hidden">
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <AccountCard account={account} />
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-3xl"></div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {accounts.length === 0 && (
          <div className="col-span-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center shadow-2xl">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏦</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Accounts Yet</h3>
            <p className="text-white/60 mb-6">Get started by creating your first account</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full"></div>
    </div>
  );
}