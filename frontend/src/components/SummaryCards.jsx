export default function SummaryCards({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const categoryTotals = {};
  expenses.forEach((e) => {
    const cat = e.category || "Unknown";
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Number(e.amount || 0);
  });
  const top = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
  const topCategory = top ? top[0] : "Unknown";
  return (
    <div className="summary-row">
      <div className="card">
        <h3>Total Amount</h3>
        <p>{total}</p>
      </div>
      <div className="card">
        <h3>Most Spent</h3>
        <p>{topCategory}</p>
      </div>
    </div>
  );
}
