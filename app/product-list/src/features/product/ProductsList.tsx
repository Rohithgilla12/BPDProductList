import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { CompanyCard } from "../company/company.styles";
import { Product } from "./productSlice";
import { ProductWrapper } from "./ProductList";

export function ProductsList(props: { products: Array<Product> | undefined; }) {
	const { products } = props;
	return (
		<>
			{products?.map((product) => (
				<Grid item xs={12} md={3} key={product.id}>
					<CompanyCard>
						<ProductWrapper key={product.id}>
							<Typography variant="subtitle1">Name : {product.name}</Typography>
							<Typography variant="subtitle1">Packing : {product.packing}</Typography>
						</ProductWrapper>
					</CompanyCard>
				</Grid>
			))}
		</>
	);
}
