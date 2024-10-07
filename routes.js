import { Router } from "express";
import axios from "axios";

const API_URL = process.env.API_URL;
const routes = Router();

routes.route('/')
.get(async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        res.render("index", { products: response.data });
    } catch (error) {
        res.status(500).send('Ошибка при получении товаров для главной страницы');
    }
});


routes.route('/about')
.get((req, res) => {
    res.render("about");
});


routes.route('/contact')
.get((req, res) => {
    res.render("contacts");
});


routes.route('/categories')
.get(async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        res.render("categories", { categories: response.data });
    } catch (error) {
        res.status(500).send('Ошибка при получении категорий');
    }
})
.post(async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/categories`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при добавлении категории');
    }
});


routes.route('/categories/:id')
.get(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const productsResponse = await axios.get(`${API_URL}/products?categoryId=${categoryId}`);
        const categoryResponse = await axios.get(`${API_URL}/categories/${categoryId}`);
        res.render('category', {
            products: productsResponse.data,
            category: categoryResponse.data
        });
    } catch (error) {
        res.status(500).send('Ошибка при получении товаров по категории');
    }
})
.delete(async (req, res) => {
    try {
        await axios.delete(`${API_URL}/categories/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Ошибка при удалении категории');
    }
});


routes.route('/products')
.get(async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при получении товаров');
    }
})
.post(async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/products`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при добавлении товара');
    }
});


routes.route('/products/:id')
.get(async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/products/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при получении товара');
    }
})
.put(async (req, res) => {
    try {
        const response = await axios.put(`${API_URL}/products/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при обновлении товара');
    }
})
.delete(async (req, res) => {
    try {
        await axios.delete(`${API_URL}/products/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Ошибка при удалении товара');
    }
});


routes.route('/users')
.get(async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при получении пользователей');
    }
})
.post(async (req, res) => {
    try {
        const response = await axios.post(`${API_URL}/users`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Ошибка при добавлении пользователя');
    }
});


routes.route('/users/:id')
.delete(async (req, res) => {
    try {
        await axios.delete(`${API_URL}/users/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Ошибка при удалении пользователя');
    }
});

export default routes;
