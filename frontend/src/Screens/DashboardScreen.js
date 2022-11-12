import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
    
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
  const options = {
    title: "Inscription des Utilisateurs",
    hAxis: { title: "Mois", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
    ticks: [0, .3, .6, .9, 1]
    
  };
  return (
    <div>
      <div className="row">
        <h1>Tableau de bords</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Utilisateurs
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Agences
                </span>
              </div>
              <div className="summary-body">{summary.usersSeller[0].numUsersSeller}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Locations
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Locations payé
                </span>
              </div>
              <div className="summary-body">
                {summary.ordersPaid[0] ? summary.ordersPaid[0].numOrders: 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Loyer
                </span>
              </div>
              <div className="summary-body">
                
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(1)
                  : 0}  xof  
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Graphe </h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>Aucun Loyer reçu </MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x.id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
            <div>
              <h2>Graphe </h2>
              {summary.dailyUsers.length === 0 ? (
                <MessageBox>Aucun utilisateur </MessageBox>
              ) : (
               
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Utilisateurs'],
                    
                    ...summary.dailyUsers.map((x) => [x.id, x.users]),
                  ]
                }
                options ={options}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
