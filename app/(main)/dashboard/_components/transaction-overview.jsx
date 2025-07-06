"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, Target } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
  "#FF8A65",
  "#81C784",
  "#64B5F6",
];

const GRADIENT_COLORS = [
  { start: "#FF6B6B", end: "#FF8E8E" },
  { start: "#4ECDC4", end: "#6FD8D2" },
  { start: "#45B7D1", end: "#67C5DD" },
  { start: "#96CEB4", end: "#B0D9C2" },
  { start: "#FFEEAD", end: "#FFF2C7" },
];

// Sample data for demo
const sampleAccounts = [
  { id: "1", name: "💳 Checking", isDefault: true },
  { id: "2", name: "💰 Savings", isDefault: false },
  { id: "3", name: "🏦 Credit Card", isDefault: false },
];

const sampleTransactions = [
  {
    id: "1",
    accountId: "1",
    description: "☕ Starbucks Coffee",
    amount: 4.50,
    type: "EXPENSE",
    category: "Food & Dining",
    date: "2025-07-04",
  },
  {
    id: "2",
    accountId: "1",
    description: "💼 Monthly Salary",
    amount: 2500.00,
    type: "INCOME",
    category: "Income",
    date: "2025-07-01",
  },
  {
    id: "3",
    accountId: "1",
    description: "🛒 Whole Foods",
    amount: 85.30,
    type: "EXPENSE",
    category: "Food & Dining",
    date: "2025-07-03",
  },
  {
    id: "4",
    accountId: "1",
    description: "⛽ Shell Gas Station",
    amount: 45.00,
    type: "EXPENSE",
    category: "Transportation",
    date: "2025-07-02",
  },
  {
    id: "5",
    accountId: "1",
    description: "🎬 Netflix Subscription",
    amount: 15.99,
    type: "EXPENSE",
    category: "Entertainment",
    date: "2025-07-01",
  },
  {
    id: "6",
    accountId: "1",
    description: "🏠 Rent Payment",
    amount: 1200.00,
    type: "EXPENSE",
    category: "Housing",
    date: "2025-07-01",
  },
  {
    id: "7",
    accountId: "1",
    description: "💡 Electric Bill",
    amount: 89.50,
    type: "EXPENSE",
    category: "Utilities",
    date: "2025-06-30",
  },
  {
    id: "8",
    accountId: "1",
    description: "👕 Amazon Shopping",
    amount: 67.99,
    type: "EXPENSE",
    category: "Shopping",
    date: "2025-06-28",
  },
];

// Custom animated pie chart cell
const AnimatedCell = ({ fill, ...props }) => {
  const [animatedFill, setAnimatedFill] = useState(fill);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedFill(fill);
    }, Math.random() * 1000);
    return () => clearTimeout(timer);
  }, [fill]);

  return (
    <Cell 
      {...props} 
      fill={animatedFill}
      style={{
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
        transition: 'all 0.3s ease',
      }}
    />
  );
};

export function DashboardOverview({ accounts = sampleAccounts, transactions = sampleTransactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [chartType, setChartType] = useState("pie");

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 6)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for charts
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount], index) => ({
      name: category,
      value: amount,
      color: COLORS[index % COLORS.length],
      gradient: GRADIENT_COLORS[index % GRADIENT_COLORS.length],
    })
  );

  const barChartData = pieChartData.map((item, index) => ({
    ...item,
    fill: `url(#gradient${index})`,
  }));

  // Calculate totals
  const totalExpenses = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = accountTransactions
    .filter(t => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-2xl backdrop-blur-sm">
          <p className="text-white font-medium">{label}</p>
          <p className="text-blue-400">
            Amount: <span className="font-bold text-green-400">${payload[0].value.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Income</p>
                <p className="text-white text-2xl font-bold">${totalIncome.toFixed(2)}</p>
              </div>
              <TrendingUp className="text-green-200 w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-600 to-red-700 border-red-500 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Total Expenses</p>
                <p className="text-white text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
              <TrendingDown className="text-red-200 w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 transform hover:scale-105 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Net Balance</p>
                <p className="text-white text-2xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</p>
              </div>
              <Wallet className="text-blue-200 w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enhanced Recent Transactions Card */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl transform hover:shadow-3xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              Recent Transactions
            </CardTitle>
            <Select
              value={selectedAccountId}
              onValueChange={setSelectedAccountId}
            >
              <SelectTrigger className="w-[160px] bg-gray-700 border-gray-600 text-white hover:bg-gray-600 transition-colors">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id} className="text-white hover:bg-gray-600 focus:bg-gray-600">
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {recentTransactions.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  No recent transactions
                </p>
              ) : (
                recentTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={cn(
                      "flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0",
                      "hover:bg-gray-750 transition-all duration-200 transform hover:scale-[1.02]",
                      "animate-slideIn"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        transaction.type === "EXPENSE" 
                          ? "bg-red-500/20 text-red-400" 
                          : "bg-green-500/20 text-green-400"
                      )}>
                        {transaction.type === "EXPENSE" ? (
                          <ArrowDownRight className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-white">
                          {transaction.description || "Untitled Transaction"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(transaction.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={cn(
                      "text-right",
                      transaction.type === "EXPENSE" ? "text-red-400" : "text-green-400"
                    )}>
                      <p className="font-bold text-lg">
                        {transaction.type === "EXPENSE" ? "-" : "+"}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Expense Breakdown Card */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl transform hover:shadow-3xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Expense Breakdown
              </CardTitle>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[120px] bg-gray-700 border-gray-600 text-white hover:bg-gray-600 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="pie" className="text-white hover:bg-gray-600">Pie Chart</SelectItem>
                  <SelectItem value="bar" className="text-white hover:bg-gray-600">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-6">
            {pieChartData.length === 0 ? (
              <p className="text-center text-gray-400 py-8">
                No expenses this month
              </p>
            ) : (
              <div className="h-[400px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "pie" ? (
                    <PieChart>
                      <defs>
                        {GRADIENT_COLORS.map((gradient, index) => (
                          <linearGradient key={index} id={`pieGradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={gradient.start} />
                            <stop offset="100%" stopColor={gradient.end} />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={60}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                        animationBegin={0}
                        animationDuration={1500}
                        onMouseEnter={(_, index) => setHoveredCategory(index)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#pieGradient${index % GRADIENT_COLORS.length})`}
                            stroke={hoveredCategory === index ? "#fff" : "none"}
                            strokeWidth={hoveredCategory === index ? 2 : 0}
                            style={{
                              filter: hoveredCategory === index ? 'brightness(1.2)' : 'none',
                              transform: hoveredCategory === index ? 'scale(1.05)' : 'scale(1)',
                              transformOrigin: 'center',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{
                          color: "#fff",
                          paddingTop: "20px",
                        }}
                        iconType="circle"
                      />
                    </PieChart>
                  ) : (
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        {GRADIENT_COLORS.map((gradient, index) => (
                          <linearGradient key={index} id={`barGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={gradient.start} />
                            <stop offset="100%" stopColor={gradient.end} />
                          </linearGradient>
                        ))}
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]}
                        animationBegin={0}
                        animationDuration={1500}
                      >
                        {barChartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`url(#barGradient${index % GRADIENT_COLORS.length})`} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

export default DashboardOverview;