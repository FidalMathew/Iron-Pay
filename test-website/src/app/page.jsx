"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {IronfishButton} from "ironpay-sdk";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://65d228d2987977636bfc0629.mockapi.io/products/allproducts"
        );
        const result = await response.json();
        setData(result);
        console.log(result, "res");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="p-5 flex gap-3">
        {data &&
          data.map((item) => {
            return (
              <Card key={item.id} className="flex-1">
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.owner}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Price: {item.price}</p>
                </CardContent>
                <CardFooter>
                  <IronfishButton
                    text="Pay with IRON"
                    product={{
                      productId: item.id,
                      price: item.price,
                      name: item.name,
                      qty: 1,
                      timestamp: Date.now(),
                      owner: item.owner,
                    }}
                  />
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </>
  );
}
