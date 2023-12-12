import React from 'react'

function ContentContainer({children}: {children: React.ReactNode}) {
  return (
    <div className="mx-14 grid md:grid-cols-4 gap-2 my-2 justify-center">
        {children}
    </div>
  )
}

export default ContentContainer