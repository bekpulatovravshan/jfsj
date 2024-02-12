import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Switch, message } from 'antd';
import axios from 'axios';
import { generateId } from '../../utils';
import { useForm } from 'antd/es/form/Form';

const ProductDrawer = ({ open, handleDrawer, getData, editData }) => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  async function onFinish(value) {
    const newPrice = +value.price;

    if (editData) {
      setLoading(true);
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}products/${editData.id}`,
          {
            ...form.getFieldsValue(),
            price: Number(form.getFieldValue('price')),
          }
        );
        setLoading(false);
        handleDrawer();
        getData();
      } catch (err) {
        setLoading(false);
        handleDrawer();
        message.error('Error');
      }
    } else {
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_API_URL}/products`, {
          id: generateId(),
          title: value.title,
          image: value.image,
          category: value.category,
          onSale: value.onSale,
          price: newPrice,
        })
        .then(function (response) {
          console.log(response);
          message.success('Product successfully created!');
          setLoading(false);
          handleDrawer();
          getData();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    } else {
      form.resetFields();
    }
  }, [open]);
  return (
    <Drawer
      size="large"
      title="Post product"
      open={open}
      onClose={handleDrawer}>
      <Form
        form={form}
        variant="filled"
        onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please, enter product title!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[
            {
              required: true,
              message: 'Please, enter product image url!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: 'Please, enter product category!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please, enter product price!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="On Sale"
          name="onSale">
          <Switch />
        </Form.Item>

        {editData ? (
          <Button
            className="bg-blue-600 text-white"
            htmlType="submit"
            loading={loading}>
            Edit
          </Button>
        ) : (
          <Button
            className="bg-blue-600 text-white"
            htmlType="submit"
            loading={loading}>
            Submit
          </Button>
        )}
      </Form>
    </Drawer>
  );
};

export default ProductDrawer;
