'use client'
import React from 'react'
import usePagination from '@lucasmogari/react-pagination'

interface PaginationProps {
    page : number
    totalItems: number
    perPage: number
}

const Pagination = ({page, totalItems, perPage}: PaginationProps) => {
    
    const {fromItem, toItem, getPageItem, totalPages} = usePagination({
        totalItems: totalItems,
        page: page,
        itemsPerPage: perPage,
        maxPageItems: 3
    })
    console.log(totalPages)
    const firstPage =1
    const nextPage = Math.min(page + 1, totalPages)
    const prevPage = Math.max(page - 1, firstPage)
    const arr = new Array(totalPages +2) //몇번 순환을 할것인지 만들어줌 Array(3)은 빈 내용이 3개로 이루어진 배열을 만듬 [ , , ] 배열 +2 의 의미는 < 1 2 3 > 이런식으로 해주겠다는 의미임 [왼쪽 이동 버튼, 1페이지, 2페이지, 3페이지, 오른쪽 이동 버튼 ]
    return (
        <div>
            Item {fromItem} - {toItem}
            {[...arr].map((_,i)=>{ // map 함수의 첫번째 파라미터에 _는 아이템을 않쓰겠다고 명시적으로 작성한것임
                const {page, disabled, current} = getPageItem(i)
                console.log('page', 'disabled', 'current', page, disabled, current)
                if(page==='previous'){
                    return(<span key={i}>{"<"}</span>)
                }
                if(page==='next'){
                    return(<span key={i}>{">"}</span>)
                }
                if(page==='gap'){
                    return(<span key={i}>{"..."}</span>)
                }
                return (<span key={i}>{page}</span>)
            })}
        </div>
    )
}

export default Pagination