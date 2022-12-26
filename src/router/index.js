import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Dashboard1 from '../components/DashBoard1.vue'
import StockPage from '../components/StockPage.vue'
import SignIn from '../components/SignIn.vue'
import PortfolioOP from '../components/PortfolioOP.vue'
import TransactionsHistory from '../components/TransactionsHistory.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: SignIn
    },

    {
      path: '/StockPage',
      name: 'StockPage',
      component: StockPage
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard1
    },
    {
      path: '/Portfolios',
      name: 'Portfolios',
      component: PortfolioOP
    },
    {
      path: '/Transactions',
      name: 'Transactions',
      component: TransactionsHistory
    },
  ]
})
