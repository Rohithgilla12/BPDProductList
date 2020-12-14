import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Loader from "react-loader-spinner";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CompanyCard } from "../company/company.styles";
import { Product, selectedProducts, isGettingProducts } from "./productSlice";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export function ProductList() {
	const products: Array<Product> | undefined = useSelector(selectedProducts);
	const isLoading: boolean = useSelector(isGettingProducts);

	if (isLoading) {
		return <Loader type="TailSpin" color="#00adb5" height={80} width={80} />;
	}
	return (
		<Grid container>
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
		</Grid>
	);
}

const ProductWrapper = styled.div`
    display: flex;
		flex-direction: column;
		align-items: flex-start;
`;
