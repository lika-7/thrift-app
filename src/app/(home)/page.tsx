import Container from "@/components/Container"
import getProducts, { ProductsParams } from "../actions/getProducts"
import EmptyState from "@/components/EmptyState"
import ProductCard from '@/components/ProductCard';
import getCurrentUser from "../actions/getCurrentUser";
import FloatingButton from '@/components/FloatingButton';
import Categories from '@/components/categories/Categories';

interface HomeProps {
  searchParams: ProductsParams
}

export default async function Home({searchParams}: HomeProps) {

  const products = await getProducts(searchParams)
  const currentUser = await getCurrentUser()
  //console.log('@@@',products)

  return (
    <Container>
      <Categories/>
      {
        products?.data.length === 0 
          ? <EmptyState showReset/> 
          : <>
              <div
                className='grid grid-cols-4 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
              >
                {products.data.map((product) => ( //map 함수에 ()=>{} 가 아니라 ()=>() 임
                  <ProductCard 
                    key={product.id}
                    currentUser = {currentUser}
                    data = {product}
                  />
                ))}
              </div>
            </>
      }
      <FloatingButton 
        href="/products/upload"
      >
        +
      </FloatingButton>
    </Container>
  )
}