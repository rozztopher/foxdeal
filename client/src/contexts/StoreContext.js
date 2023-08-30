import React, { Component } from "react"
import dbClient from '../utils/dbClient'
const StoreContext = React.createContext()


class StoreProvider extends Component {
    state = {
      products: [],
      readOnlyProducts:[],
      partners: [],
      product: {},
      checkout: {},
      itemsInCheckout:[],
      isCartOpen: false,
    }
  
    addItemToCheckout = async (variantId, quantity) => {
      const lineItemsToAdd = [
        {
          variantId,
          quantity: parseInt(quantity, 10),
        },
      ]      
      let updatedItemsInCheckout = [...this.state.itemsInCheckout,lineItemsToAdd]
      this.setState({ itemsInCheckout:updatedItemsInCheckout})
      this.openCart()
    }
    
    fetchAllProducts = async () => {
      const response = await dbClient.get('/products')
      const products = await response.data
      this.setState({ products: products })
      this.setState({readOnlyProducts:products})
    }    
    
    filterProducts = (cb) => {
      this.setState({products:this.state.readOnlyProducts.filter(cb)})
    }

    sortProducts = (cb) => {
      let sortedProducts = [...this.state.products]
      sortedProducts.sort(cb)
      this.setState({products:sortedProducts})
    }

    sortPartners = (cb) => {
      this.setState({partners:this.state.partners.sort(cb)})
    }

    closeCart = () => {
      this.setState({ isCartOpen: false })
    }

    openCart = () => {
      this.setState({ isCartOpen: true })
    }

    fetchAllPartners = async (userId) => {
      try {
        const apiEndpoint = userId ? `/partner?userId=${userId}` : '/partner';
        const response = await dbClient.get(apiEndpoint);
        this.setState({ partners: response.data.partners })
        
    } catch (error) {
        console.log(error);
    }
      
      
    }
  
    render() {
      return (
        <StoreContext.Provider
          value={{
            products: this.state.products,
            readOnlyProducts:this.state.readOnlyProducts,
            filterProducts:this.filterProducts,
            sortProducts:this.sortProducts,
            partners: this.state.partners,
            sortPartners:this.sortPartners,
            product: this.state.product,
            checkout: this.state.checkout,
            isCartOpen: this.state.isCartOpen,
            fetchAllProducts: this.fetchAllProducts,
            fetchAllPartners: this.fetchAllPartners,
            fetchProductWithId: this.fetchProductWithId,
            closeCart: this.closeCart,
            openCart: this.openCart,
            addItemToCheckout: this.addItemToCheckout,
          }}
        >
          {this.props.children}
        </StoreContext.Provider>
      )
    }
  }
  
  const StoreConsumer = StoreContext.Consumer
  
  export { StoreConsumer, StoreContext }
  
  export default StoreProvider
