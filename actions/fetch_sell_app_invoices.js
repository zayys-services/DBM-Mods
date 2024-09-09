const fetch = require('node-fetch');

module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //---------------------------------------------------------------------

  name: "Fetch Sell.app Invoices",

  //---------------------------------------------------------------------
  // Action Section
  //---------------------------------------------------------------------

  section: "Sell.app",

  //---------------------------------------------------------------------
  // Action Subtitle
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `Fetch Invoices from Sell.app`;
  },

  //---------------------------------------------------------------------
  // Action Fields
  //---------------------------------------------------------------------

  fields: ["apiKey"],

  //---------------------------------------------------------------------
  // Action Editor HTML
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
      <div style="padding-right: 10px; height: calc(80vh - 60px); overflow-y: auto;">
        <div style="padding: 5px 10px 0px 10px;">
          <div>
            <span class="dbminputlabel">Sell.app API Key</span><br>
            <input id="apiKey" class="round" type="text" placeholder="Enter your Sell.app API Key here">
          </div>
        </div>
      </div>
    `;
  },

  //---------------------------------------------------------------------
  // Action Function
  //---------------------------------------------------------------------

  async action(cache) {
    const apiKey = this.evalMessage(this.getInputValue(cache, "apiKey"), cache);

    if (!apiKey) {
      this.storeValue("No API Key provided", "1", "error", cache);
      return this.callNextAction(cache);
    }

    try {
      const response = await fetch('https://sell.app/api/v2/invoices', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const result = await response.json();
      if (response.ok) {
        const invoice = result.data[0]; // Assuming you want the first invoice in the list

        // Extract and store specific data from the invoice
        this.storeValue(invoice.id, "1", "invoiceId", cache);
        this.storeValue(invoice.payment.fee.base, "1", "feeBase", cache);
        this.storeValue(invoice.payment.fee.currency, "1", "feeCurrency", cache);
        this.storeValue(invoice.payment.fee.units, "1", "feeUnits", cache);
        this.storeValue(invoice.payment.fee.vat, "1", "feeVat", cache);
        this.storeValue(invoice.payment.fee.total.exclusive, "1", "feeTotalExclusive", cache);
        this.storeValue(invoice.payment.fee.total.inclusive, "1", "feeTotalInclusive", cache);
        this.storeValue(invoice.payment.gateway.data.total.base, "1", "gatewayTotalBase", cache);
        this.storeValue(invoice.payment.gateway.data.total.currency, "1", "gatewayTotalCurrency", cache);
        this.storeValue(invoice.payment.gateway.data.total.units, "1", "gatewayTotalUnits", cache);
        this.storeValue(invoice.payment.gateway.data.total.vat, "1", "gatewayTotalVat", cache);
        this.storeValue(invoice.payment.gateway.data.total.total.exclusive, "1", "gatewayTotalTotalExclusive", cache);
        this.storeValue(invoice.payment.gateway.data.total.total.inclusive, "1", "gatewayTotalTotalInclusive", cache);
        this.storeValue(invoice.payment.gateway.data.customer_email, "1", "customerEmail", cache);
        this.storeValue(invoice.payment.gateway.data.transaction_id, "1", "transactionId", cache);
        this.storeValue(invoice.payment.gateway.type, "1", "gatewayType", cache);
        this.storeValue(invoice.payment.subtotal.base, "1", "subtotalBase", cache);
        this.storeValue(invoice.payment.subtotal.currency, "1", "subtotalCurrency", cache);
        this.storeValue(invoice.payment.subtotal.units, "1", "subtotalUnits", cache);
        this.storeValue(invoice.payment.subtotal.vat, "1", "subtotalVat", cache);
        this.storeValue(invoice.payment.subtotal.total.exclusive, "1", "subtotalTotalExclusive", cache);
        this.storeValue(invoice.payment.subtotal.total.inclusive, "1", "subtotalTotalInclusive", cache);
        this.storeValue(invoice.payment.expires_at, "1", "expiresAt", cache);
        this.storeValue(invoice.payment.full_price.base, "1", "fullPriceBase", cache);
        this.storeValue(invoice.payment.full_price.currency, "1", "fullPriceCurrency", cache);
        this.storeValue(invoice.payment.full_price.units, "1", "fullPriceUnits", cache);
        this.storeValue(invoice.payment.full_price.vat, "1", "fullPriceVat", cache);
        this.storeValue(invoice.payment.full_price.total.exclusive, "1", "fullPriceTotalExclusive", cache);
        this.storeValue(invoice.payment.full_price.total.inclusive, "1", "fullPriceTotalInclusive", cache);
        this.storeValue(invoice.payment.original_amount.base, "1", "originalAmountBase", cache);
        this.storeValue(invoice.payment.original_amount.currency, "1", "originalAmountCurrency", cache);
        this.storeValue(invoice.payment.original_amount.units, "1", "originalAmountUnits", cache);
        this.storeValue(invoice.payment.original_amount.vat, "1", "originalAmountVat", cache);
        this.storeValue(invoice.payment.original_amount.total.exclusive, "1", "originalAmountTotalExclusive", cache);
        this.storeValue(invoice.payment.original_amount.total.inclusive, "1", "originalAmountTotalInclusive", cache);
        this.storeValue(invoice.status.history[0].setAt, "1", "statusSetAt", cache);
        this.storeValue(invoice.status.history[0].status, "1", "statusStatus", cache);
        this.storeValue(invoice.status.history[0].updatedAt, "1", "statusUpdatedAt", cache);
        this.storeValue(invoice.status.status.setAt, "1", "currentStatusSetAt", cache);
        this.storeValue(invoice.status.status.status, "1", "currentStatusStatus", cache);
        this.storeValue(invoice.status.status.updatedAt, "1", "currentStatusUpdatedAt", cache);
        this.storeValue(invoice.created_at, "1", "createdAt", cache);
        this.storeValue(invoice.updated_at, "1", "updatedAt", cache);
        this.storeValue(invoice.store_id, "1", "storeId", cache);
        this.storeValue(invoice.coupon_id, "1", "couponId", cache);
        this.storeValue(invoice.subscription_id, "1", "subscriptionId", cache);
        this.storeValue(invoice.customer_information.id, "1", "customerId", cache);
        this.storeValue(invoice.customer_information.email, "1", "customerEmail", cache);
        this.storeValue(invoice.customer_information.country, "1", "customerCountry", cache);
        this.storeValue(invoice.customer_information.location, "1", "customerLocation", cache);
        this.storeValue(invoice.customer_information.ip, "1", "customerIp", cache);
        this.storeValue(invoice.customer_information.proxied, "1", "customerProxied", cache);
        this.storeValue(invoice.customer_information.browser_agent, "1", "customerBrowserAgent", cache);
        this.storeValue(invoice.customer_information.vat.amount, "1", "customerVatAmount", cache);
        this.storeValue(invoice.customer_information.vat.country, "1", "customerVatCountry", cache);

      } else {
        this.storeValue(`Error: ${result.message}`, "1", "error", cache);
      }
    } catch (error) {
      this.storeValue(`Error: ${error.message}`, "1", "error", cache);
    }

    this.callNextAction(cache);
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    if (varType !== 1) return;
    return ["invoiceId", "Fetched Invoice ID"];
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //---------------------------------------------------------------------

  meta: {
    version: "1.0.0",
    preciseCheck: false,
    author: "Zayys Servuces",
    authorUrl: "https://github.com/zayys-services/DBM-Mods/tree/main",
    downloadUrl: "https://github.com/zayys-services/DBM-Mods/blob/main/actions/fetch_sell_app_invoices.js",
    maintainer: { name: "Zayys Services", url: "https://github.com/zayys-services/DBM-Mods/tree/main" },
    repository: { name: "DBM Mods - ZS", url: "https://github.com/zayys-services/DBM-Mods/tree/main" }
  },

  //---------------------------------------------------------------------
  // Dialog Size
  //---------------------------------------------------------------------

  size() {
    return {
      width: 560,
      height: 300
    };
  }
};
