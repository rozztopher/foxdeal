import React, { useContext, useState } from 'react'
import Menu from '@material-ui/core/Menu'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { StoreContext } from '../../contexts/StoreContext';

function ProductFilterMenu() {
    const {products,readOnlyProducts,filterProducts,sortProducts} = useContext(StoreContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const [sliderMin, setSliderMin] = useState(0)
    const [sliderMax, setSliderMax] = useState(1300)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedSort, setSelectedSort] = useState('')
    const { Range } = Slider
  
    const combineFilters = (categoryList,minValue,maxValue) =>{
        const filters = (product) => {
            let price = parseFloat(product.variants[0].price)
            return categoryList.includes(product.productType) &&  price > minValue && price < maxValue
        }
        filterProducts(filters)
        let cb = getSort(selectedSort)
        setTimeout(() => {
            sortProducts(cb)
        }, 500);
    }

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sliderChange = (e) => {
        setSliderMin(e[0])
        setSliderMax(e[1])
        combineFilters(selectedCategories,e[0],e[1])
    }

    const handleSliderMinChange = (e) => {
        let minValue = e.target.value
        setSliderMin(minValue)
        combineFilters(selectedCategories,minValue,sliderMax)
    }

    const handleSliderMaxChange = (e) => {
        let maxValue = e.target.value
        setSliderMax(maxValue)
        combineFilters(selectedCategories,sliderMin,maxValue)
    }

    const handleCategoryChange = (e) => {
        const categoryList = [...selectedCategories]
        const value = e.target.value
        if (selectedCategories.includes(value)) {
            const index = categoryList.indexOf(value)
            if (index > -1) {
                categoryList.splice(index, 1);
            }
        } else {
            categoryList.push(value)
        }
        setSelectedCategories(categoryList)
        combineFilters(categoryList,sliderMin,sliderMax)
    }

    const getSort = (sortString) => {
        let cb;
        switch (sortString) {
            case 'Price: low to high':{
                    cb = (a,b) => parseFloat( a.variants[0].price ) - parseFloat( b.variants[0].price);
                    break;
                  }
            case 'Price: high to low':{
                    cb = (a,b) => parseFloat(b.variants[0].price) - parseFloat( a.variants[0].price);
                    break;
                  }

            case 'Alphabetically (a-z)':{
                    cb = (a,b) => a.handle.toLowerCase().localeCompare(b.handle.toLowerCase())
                    break;
                }
            default:{
                    cb = (a,b) => a.handle.toLowerCase().localeCompare(b.handle.toLowerCase())
                    break;
            }
        }
        return cb
    }

    const handleSortChange = (e) => {
        let sortString = e.target.value
        setSelectedSort(sortString)
        let cb = getSort(sortString)
        sortProducts(cb)
    }

    const categoryFilters = ['Laptops','iPhone','Videospielkonsolen','Ghettoblaster']
    const sortByOptions = ['Price: low to high', 'Price: high to low', 'Alphabetically (a-z)']

    return (
        <div style={{width: '100%'}}>
            <div className='filter-select inline' onClick={handleClickListItem}>
                <img src='/icons/filter-icon.svg' alt='filter'></img>
                <p className='bold body-text gap-left-1'>Filter</p>
                <img className='stick-right gap-right-1' src='/icons/down-chevron-icon.svg' alt='down'></img>
            </div>
            <Menu
                id='lock-menu'
                className='product-filter-menu med-text'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className='inline'>
                    <img src='/icons/filter-icon.svg' alt='filter'></img>
                    <p className='bold body-text gap-left-1'>Filter</p>
                </div>
                <div className='horizontal-divider gap-top-2'></div>
                <p className='grey-text mt-20 price-text'>CATEGORIES</p>
                {
                    categoryFilters.map(filter => {
                        return (
                            <div className='mt-10' key={filter}>
                                <input className='radio-input' type='checkbox' id={filter} value={filter} onChange={handleCategoryChange}></input>
                                <label className={selectedCategories.includes(filter) ? 'body-text bold' : 'body-text'} htmlFor={filter}>{filter}</label>
                            </div>
                        )
                    })
                }
                <div className='horizontal-divider mt-20'></div>
                <p className='grey-text mt-20 price-text'>PRICE</p>
                <div className='price-grid mt-12'>
                    <input className='filter-form-input' value={sliderMin} onChange={handleSliderMinChange}></input>
                    <div className='horizontal-divider'></div>
                    <input className='filter-form-input' value={sliderMax} onChange={handleSliderMaxChange}></input>
                </div>
                <div className='slider mt-20'>
                    <Range min={0} max={1300} value={[sliderMin, sliderMax]} onChange={sliderChange} />
                </div>
                <div className='flex-edge mt-19'>
                    <p className='body-text grey-text'>CHF0</p>
                    <p className='body-text grey-text'>CHF1300</p>
                </div>
                <div className='horizontal-divider mt-20'></div>
                <p className='grey-text mt-20 price-text'>SORT BY</p>
                {
                    sortByOptions.map(option => {
                        return (
                            <div className='mt-10' key={option}>
                                <input className='radio-input' type='radio' name='sort' id={option} value={option} onClick={handleSortChange}></input>
                                <label className={selectedSort === option ? 'body-text bold' : 'body-text'} htmlFor={option}>{option}</label>
                            </div>
                        )
                    })
                }
            </Menu>
        </div>
    )
}

export default ProductFilterMenu