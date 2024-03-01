const FoodDetail = (props) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <h2 className='h-40 w-full max-w-full rounded-lg'>{props.title}</h2>
            <h2 className='h-40 w-full max-w-full rounded-lg'>{props.calories}</h2>
            {/* <h2 className='h-40 w-full max-w-full rounded-lg'>{props.chips}</h2>
            <h2 className='h-40 w-full max-w-full rounded-lg'>{props.nutrients}</h2> */}
        </div>
    );
}

export default FoodDetail;