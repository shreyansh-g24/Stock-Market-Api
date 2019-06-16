// Financial Modelling api routes: version 3 //
// https://financialmodelingprep.com

module.exports = {

  // Company Profile //

  // Companies profile (Price, Beta, Volume Average, Market Capitalisation, Last Dividend, 52 week range, stock price change, stock price change in percentage, Company Name, Exchange, Description, Industry, Sector, CEO, Website and image). Hourly JSON
  coProfile: "https://financialmodelingprep.com/api/v3/company/profile/AAPL",
  
  // Company Financial Statements //

  // Income Statement
  // Annual income statements. Annual JSON
  coIncomeStatement: "https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL",
  // Quarterly income statements. Quarter JSON
  coIncomeStatementJSON_Quarter: "https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL?period=quarter",
  // Downloadable Annual/Quarter CSV file:
  coIncomeStatementCSV_Annual: "https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL?datatype=csv",

  // Balance Sheet Statement // 

  // Annual balance sheet statements. Annual JSON
  coBalanceSheetJSON_Annual: "https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/AAPL",
  // Quarterly balance sheet statements. Quarter JSON
  coBalanceSheetJSON_Quarter: "https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/AAPL?period=quarter",
  // Downloadable Annual/Quarter CSV file:
  coBalanceSheetCSV_Annual: "https://financialmodelingprep.com/api/v3/financials/balance-sheet-statement/AAPL?datatype=csv",
  
  // Cash Flow Statement //

  // Annual cash flow statements. Annual JSON
  coCFSJSON_Annual: "https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/AAPL",
  // Quarterly cash flow statements. Quarter JSON
  coCFSJSON_Quarter: "https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/AAPL?period=quarter",
  // Downloadable Annual Quarter CSV file:
  coCFSCSV_Annual: "https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/AAPL?datatype=csv",

  // Batch Request Company Financial Statements //

  // Multiple financial statements. Annual/Quarter JSON
  coBatchCFSJSON_Annual: "https://financialmodelingprep.com/api/v3/financials/income-statement/AAPL,FB,GOOG",

  // Company Financial Ratios //

  // Company financial ratios (liquidity Measurement Ratios, Profitability Indicator Ratios, Debt Ratios, Operating Performance Ratios, Cash Flow Indicator Ratios and Investment Valuation Ratios). Annual JSON
  coFR: "https://financialmodelingprep.com/api/v3/financial-ratios/AAPL",

  // Company Enterprise Value //

  // Company annual enterprise value. Annual JSON
  coValueJSON_Annual: "https://financialmodelingprep.com/api/v3/enterprise-value/AAPL",
  // Company quarterly enterprise value. Quarter JSON
  coValueJSON_Quarter: "https://financialmodelingprep.com/api/v3/enterprise-value/AAPL?period=quarter",

  // Company Key Metrics // 

  // Company annual key metrics. Annual JSON
  coKeyMetricsJSON_Annual: "https://financialmodelingprep.com/api/v3/company-key-metrics/AAPL",
  // Company quarterly company key metrics. Quarter JSON
  coKeyMetricsJSON_Quarter: "https://financialmodelingprep.com/api/v3/company-key-metrics/AAPL?period=quarter",

  // Company Financial Growth //

  // Company annual financial statement growth. Annual JSON
  coFSGrowthJSON_Annual: "https://financialmodelingprep.com/api/v3/financial-statement-growth/AAPL",
  // Company quarterly financial statement growth. Quarter JSON
  coFSGrowthJSON_Quarter: "https://financialmodelingprep.com/api/v3/financial-statement-growth/AAPL?period=quarter",

  // Company Rating //

  // Companies rating. Daily JSON
  coRatingsJSON_Daily: "https://financialmodelingprep.com/api/v3/company/rating/AAPL",

  // Company Discounted cash flow value //
  // DCF //

  // Companies Discounted cash flow value (intrinsic value). Realtime JSON
  coDCFJSON_Realtime: "https://financialmodelingprep.com/api/v3/company/discounted-cash-flow/AAPL",
  
  // Historical DCF //

  // Companies Historical Discounted cash flow value. Annual JSON
  coDCFJSON_Annual: "https://financialmodelingprep.com/api/v3/company/historical-discounted-cash-flow/AAPL",
  // Companies Historical Discounted cash flow value. Quarter JSON
  coDCFJSON_Quarter: "https://financialmodelingprep.com/api/v3/company/historical-discounted-cash-flow/AAPL?period=quarter",

  // Stock Price //
  // Stock Realtime Price //

  // Realtime stock price. Realtime JSON
  coStockJSON_Realtime: "https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL",
  
  // Stock Price list //

  // All realtime stock price. Realtime JSON
  coListStockJSON_Realtime: "https://financialmodelingprep.com/api/v3/stock/real-time-price",

  // Stock Historical Price //
  // Historical price //

  // Stock historical prices. Daily JSON
  coStockJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line",
  
  // Historical price with change and volume //

  // Stock historical prices with change and volume. Daily JSON OHLCV
  coStockOHLCVJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL",
  
  // Historical price with change and volume interval //

  // Time series stock historical prices for a certain interval Daily JSON Range
  coTimeSeriesJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=2018-03-12&to=2019-03-12",
  
  // Historical price with change and volume Time series //

  // Time series stock historical prices with change and volume for the last x days. Daily JSON Timeseries
  coTimeSeriesJSON_HistoricalSpecific: "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?timeseries=5",
  
  // Batch Request Stock Historical price //

  // Stock historical prices with change and volume (limited to 3). Daily JSON
  coBatchStockJSON_HistoricalDaily: "https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOG,FB",

  // Symbols List //

  // All Companies ticker symbols available in Financial Modeling Prep. High Usage JSON
  coSymbolsJSON: "https://financialmodelingprep.com/api/v3/company/stock/list",

  // Batch Request Stock Companies Price //

  // Multiple companies Prices. High Usage JSON
  coBatchSymbolsJSON: "https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL,FB,GOOG",

  // Most of the majors indexes (Dow Jones, Nasdaq, S&P 500) //
  // Majors Indexes List //

  // Majors Indexes (Dow Jones, Nasdaq, S&P 500). Realtime JSON
  indexMajorListJSON_Realtime: "https://financialmodelingprep.com/api/v3/majors-indexes",
  
  // Single Stock Market Index such as Dow Jones //

  // Stock market index (Dow Jones). Realtime JSON
  indexJSON_Realtime: "https://financialmodelingprep.com/api/v3/majors-indexes/.DJI",

  // Most Active Stock Companies //

  // Most Active Stock Companies. Daily
  coActiveListJSON_Daily: "https://financialmodelingprep.com/api/v3/stock/actives",

  // Most Gainer Stock Companies //

  // Most Gainer Stock Companies. Daily
  coGainerListJSON_Daily: "https://financialmodelingprep.com/api/v3/stock/gainers",

  // Most Loser Stock Companies //

  // Most Losers Stock Companies. Daily
  coLoserListJSON_Daily: "https://financialmodelingprep.com/api/v3/stock/losers",

  // NYSE Holidays and Trading Hours //

  // NYSE: Holidays and Trading Hours. JSON
  nyseHoursJSON: "https://financialmodelingprep.com/api/v3/is-the-market-open",

  // Stock Market Sectors Performance //

  // Stock Market Sectors Performance. Hourly JSON
  sectorsJSON_Hourly: "https://financialmodelingprep.com/api/v3/stock/sectors-performance",

  // Cryptocurrencies //
  // Digital and Cryptocurrencies //

  // Wide range of data feed for digital and Cryptocurrencies. Realtime
  ccListJSON_Realtime: "https://financialmodelingprep.com/api/v3/cryptocurrencies",
  
  // Single Cryptocurrency such as Bitcoin //

  // This API provide a wide range of data feed for digital and crypto currency such as Bitcoin. Realtime
  ccJSON_Realtime: "https://financialmodelingprep.com/api/v3/cryptocurrency/BTC",

  // Forex (FX) //
  // Forex Currency Exchange Rate (FX) //

  // Currency exchange rates (FX). Realtime JSON
  forexListJSON_Realtime: "https://financialmodelingprep.com/api/v3/forex",
  
  // Single Currency such as Euro-dollars (EUR/USD) //
  
  // Currency exchange rate such as Euro-dollars (EUR/USD). Realtime JSON
  forexJSON_Realtime: "https://financialmodelingprep.com/api/v3/forex/EURUSD",

};