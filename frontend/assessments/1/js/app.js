class StockDashboard {
  constructor() {
    // Configuration
    this.barWidth = 20;
    this.chartHeight = 500;
    this.priceRange = { min: 0, max: 500 };
    this.updateInterval = 5000; // 5 seconds
    this.pixelsPerRupee = 1; // 1px = Re.1
    
    
    this.priceHistory = [];
    this.currentPrice = 250; // Initial price
    this.previousPrice = 250;
    this.transactionHistory = [];
    
    // DOM Elements
    this.priceValueEl = document.getElementById('priceValue');
    this.priceDeltaEl = document.getElementById('priceDelta');
    this.chartBarsEl = document.getElementById('bars');
    this.chartBoxEl = document.getElementById('chartBox');
    this.historyListEl = document.getElementById('historyList');
    this.qtyInputEl = document.getElementById('qty');
    this.buyBtnEl = document.getElementById('buyBtn');
    this.sellBtnEl = document.getElementById('sellBtn');
    
    // Initialize
    this.init();
  }
  
  init() {
    this.setInitialPrice();
    this.attachEventListeners();
    this.startPriceUpdates();
  }
  
  setInitialPrice() {
    this.currentPrice = this.generateRandomPrice();
    this.previousPrice = this.currentPrice;
    this.updatePriceDisplay();
    this.addPriceBar(this.currentPrice);
  }
  
  generateRandomPrice() {
    return Math.floor(Math.random() * (this.priceRange.max - this.priceRange.min + 1)) + this.priceRange.min;
  }
  
  updatePriceDisplay() {
    this.priceValueEl.textContent = this.currentPrice.toFixed(2);
    
    const delta = this.currentPrice - this.previousPrice;
    const deltaPercent = ((delta / this.previousPrice) * 100).toFixed(2);
    
    if (delta > 0) {
      this.priceDeltaEl.textContent = `↑ ${deltaPercent}%`;
      this.priceDeltaEl.className = 'stock-toolbar__delta up';
    } else if (delta < 0) {
      this.priceDeltaEl.textContent = `↓ ${Math.abs(deltaPercent)}%`;
      this.priceDeltaEl.className = 'stock-toolbar__delta down';
    } else {
      this.priceDeltaEl.textContent = '—';
      this.priceDeltaEl.className = 'stock-toolbar__delta';
    }
  }
  
  addPriceBar(price) {
    const barEl = document.createElement('div');
    barEl.className = 'bar';
    
  
    const barHeight = (price / this.priceRange.max) * this.chartHeight;
    barEl.style.height = `${barHeight}px`;
    
    // Color based on price change
    if (price > this.previousPrice) {
      barEl.classList.add('up');
    } else if (price < this.previousPrice) {
      barEl.classList.add('down');
    } else {
      barEl.classList.add('up'); // Default to up for same price
    }
    
    this.chartBarsEl.appendChild(barEl);
    this.priceHistory.push({ price, timestamp: Date.now() });
    
    // Limit bars based on container width (each bar is 20px)
    this.enforceBarLimit();
  }
  
  enforceBarLimit() {
    // Calculate max bars: approximately (75% of window width - padding) / 20px
    const chartWidth = this.chartBoxEl.clientWidth - 40; // subtract padding
    const maxBars = Math.floor(chartWidth / this.barWidth);
    
    const bars = this.chartBarsEl.querySelectorAll('.bar');
    if (bars.length > maxBars) {
      const excess = bars.length - maxBars;
      for (let i = 0; i < excess; i++) {
        bars[i].remove();
      }
      this.priceHistory = this.priceHistory.slice(excess);
    }
  }
  
  startPriceUpdates() {
    this.priceInterval = setInterval(() => {
      this.previousPrice = this.currentPrice;
      this.currentPrice = this.generateRandomPrice();
      this.updatePriceDisplay();
      this.addPriceBar(this.currentPrice);
    }, this.updateInterval);
  }
  
  attachEventListeners() {


this.buyBtnEl.addEventListener('click', () => this.handleBuy()); 

    this.sellBtnEl.addEventListener('click', () => this.handleSell());
  }
  
  handleBuy() {
    const qty = parseInt(this.qtyInputEl.value, 10);
    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
 
     // this addTransaction is defined below
     
    this.addTransaction('BUY', qty, this.currentPrice);
    this.qtyInputEl.value = '';
  }
  
  handleSell() {
    const qty = parseInt(this.qtyInputEl.value, 10);
    if (isNaN(qty) || qty <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    
    this.addTransaction('SELL', qty, this.currentPrice);
    this.qtyInputEl.value = '';
  }
  
  addTransaction(type, qty, price) {
    const transaction = {
      id: this.transactionHistory.length + 1,
      type,
      qty,
      price,
      timestamp: new Date(),
      total: qty * price
    };
    
    this.transactionHistory.push(transaction);
    this.renderHistory();
  }
  
  renderHistory() {
    this.historyListEl.innerHTML = '';
    
    // Show most recent transactions first
    const reversed = [...this.transactionHistory].reverse();
    
    reversed.forEach(transaction => {
      const itemEl = document.createElement('div');
      itemEl.className = 'history__item';
      
      const contentEl = document.createElement('div');
      contentEl.className = 'history__item-content';
      
      const qtyEl = document.createElement('div');
      qtyEl.className = 'history__item-qty';
      qtyEl.textContent = `${transaction.qty} stocks`;
      
      const timeEl = document.createElement('div');
      timeEl.className = 'history__item-time';
      timeEl.textContent = this.formatTime(transaction.timestamp);
      
      contentEl.appendChild(qtyEl);
      contentEl.appendChild(timeEl);
      
      const actionEl = document.createElement('span');
      actionEl.className = `history__item-action ${transaction.type.toLowerCase()}`;
      actionEl.textContent = transaction.type;
      
      itemEl.appendChild(contentEl);
      itemEl.appendChild(actionEl);
      
      this.historyListEl.appendChild(itemEl);
    });
  }
  
  formatTime(date) {
    return date.toLocaleTimeString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StockDashboard();
});
