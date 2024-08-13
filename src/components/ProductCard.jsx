const ProductCard = ({product}) => {
  return (
    <div>
      <h2>Name: {product.name}</h2>
      <p> Price:{product.price}</p>
    </div>
  );
}

export default ProductCard;