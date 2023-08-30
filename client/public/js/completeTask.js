document.body.addEventListener('click',()=>{
    document.parentElement.dispatchEvent('resize')
})