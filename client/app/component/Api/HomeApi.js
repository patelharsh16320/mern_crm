// app/Api/HomeApi.jsx

export const fetchHomeDashboardData = async () => {
  return {
    leadStats: [
      { title: 'Invoice', amount: 34000 },
      { title: 'Quote', amount: 38000 },
      { title: 'Payment', amount: 54000 },
      { title: 'Due Balance', amount: 4500 }
    ],
    invoice: [
      { title: 'Draft', amount: 3 },
      { title: 'Pending', amount: 5 },
      { title: 'Not Paid', amount: 12 },
      { title: 'Overdue', amount: 6 },
      { title: 'Partially Paid', amount: 8 },
      { title: 'Paid', amount: 55 }
    ],
    quote: [
      { title: 'Draft', amount: 31 },
      { title: 'Pending', amount: 15 },
      { title: 'Not Paid', amount: 16 },
      { title: 'Overdue', amount: 14 },
      { title: 'Partially Paid', amount: 45 },
      { title: 'Paid', amount: 84 }
    ],
    offer: [
      { title: 'Draft', amount: 45 },
      { title: 'Pending', amount: 55 },
      { title: 'Not Paid', amount: 52 },
      { title: 'Overdue', amount: 16 },
      { title: 'Partially Paid', amount: 80 },
      { title: 'Paid', amount: 40 }
    ]
  };
};
