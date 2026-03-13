import { Star } from "lucide-react";
import { Badge } from "../../components/ui/badge.jsx";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { useGetProductsQuery } from "./productApi.js";
import { base } from "../../app/mainApi.js";
import { useNavigate } from "react-router";
import ProductSkeleton from "./ProductSkeleton.jsx";

export default function ProductList() {

  const nav = useNavigate();
  const { data, isLoading, error } = useGetProductsQuery();

  if (error) return <p>{error?.data || "Something went wrong"}</p>;

  return (
    <div
      className="grid gap-8 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4"
    >

      {/* Skeleton Loader */}
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}

      {/* Products */}
      {!isLoading &&
        data?.map((product) => (
          <Card
            onClick={() => nav(`/product/${product._id}`)}
            key={product._id}
            className="group overflow-hidden rounded-2xl border shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-300"
          >

            {/* Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={`${base}/${product.image}`}
                alt={product.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <Badge className="absolute top-3 left-3 bg-black text-white">
                {product.category}
              </Badge>
            </div>

            {/* Content */}
            <CardContent className="p-5 space-y-3">

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {product.title}
                </h2>

                <span className="text-xs text-muted-foreground">
                  {product.brand}
                </span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm text-gray-600">
                  {product.rating === 0 ? "New" : product.rating}
                </span>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-primary">
                Rs. {product.price.toLocaleString()}
              </div>

              {/* Stock */}
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-600">
                  In Stock ({product.stock})
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Out of Stock
                </Badge>
              )}

            </CardContent>

          </Card>
        ))}

    </div>
  );
}