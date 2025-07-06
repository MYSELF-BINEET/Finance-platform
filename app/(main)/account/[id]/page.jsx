import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-gray-950">
        {/* Header Section */}
        <div className="flex gap-4 items-end justify-between">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent capitalize">
              {account.name}
            </h1>
            <p className="text-gray-400 mt-2">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
              Account
            </p>
          </div>

          <div className="text-right pb-2">
            <div className="text-xl sm:text-2xl font-bold text-gray-100">
              ${parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-gray-400">
              {account._count.transactions} Transactions
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="w-full">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-8">
                <BarLoader width={"100%"} color="#A855F7" />
              </div>
            }
          >
            <AccountChart transactions={transactions} />
          </Suspense>
        </div>

        {/* Transactions Table */}
        <div className="w-full">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-8">
                <BarLoader width={"100%"} color="#A855F7" />
              </div>
            }
          >
            <TransactionTable transactions={transactions} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}