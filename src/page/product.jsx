import React, { useEffect, useState } from 'react';
import { Button, Flex, Image, Modal, Table, message } from 'antd';
import { Typography } from 'antd';
import { sliceStr } from '../utils';
import clsx from 'clsx';
import ProductDrawer from '../component/product-drawer';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);

  
  function handleDrawer() {
    setOpen(!open);
  }

  function handleModal() {
    setModal(!modal);
  }

  const onEdit = (data) => {
    setOpen(true)
    setEditData(data);
  };

  // CRUD = Create = post, Read = get, Update = put, patch, Delete = delete

  async function getData() {
    setLoading(true);
    return await fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((json) => setProduct(json))
      .then(() => setLoading(false));
  }

  async function deleteProduct(id) {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
      setLoading(false);
      setModal(false);
      message.success('Success!');
      getData();
    } catch (error) {
      setModal(false);
      message.error('Error');
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span className="font-bold">{id + 1}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (str) => (
        <p className="font-bold text-bas text-blue-700">{sliceStr(str)}</p>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <Image
          src={image}
          width={50}
          height={50}
          alt=""
        />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <span className="text-blue-700 font-semibold">{category}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <span className="text-base font-bold">{price.toLocaleString()}</span>
      ),
    },
    {
      title: 'On Sale',
      dataIndex: 'onSale',
      key: 'onSale',
      render: (sale) => (
        <span
          className={clsx(
            `${
              sale
                ? 'text-green-600 border-green-600'
                : 'text-red-600 border-red-600'
            }  px-2 py-1 rounded-lg  border-[1px] text-xs`
          )}>
          {sale ? 'Доступен для продажи' : 'распродано'}
        </span>
      ),
    },
    {
      title: 'Actions',
      render: (record) => (
        <Flex gap={20}>
          <Button
            className="bg-blue-600 text-white"
            onClick={() => onEdit(record)}>
            Edit
          </Button>
          <div>
            <Button
              danger
              onClick={handleModal}>
              Delete
            </Button>
            <Modal
              title="Delete item"
              open={modal}
              onCancel={handleModal}
              okType="danger"
              footer={[
                <div className="flex gap-5 items-center justify-end">
                  <Button
                    type="default"
                    onClick={() => handleModal()}>
                    Cancel
                  </Button>
                  <Button
                    loading={loading}
                    danger
                    onClick={() => deleteProduct(record.id)}>
                    Ok
                  </Button>
                </div>,
              ]}>
              Are you sure delete this product?
            </Modal>
          </div>
        </Flex>
      ),
    },
  ];

  useEffect(() => {
    if(!open) {
      setEditData(null)
      
    }
  }, [open])

  console.log(editData);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between my-5">
        <Typography.Title level={2}>Product page</Typography.Title>
        <Button
          size="large"
          className="bg-blue-600 text-white"
          type="default"
          onClick={handleDrawer}>
          Post products
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={product}
        loading={loading}
      />
      <ProductDrawer
        open={open}
        handleDrawer={handleDrawer}
        getData={getData}
        editData={editData}
      />
    </div>
  );
};

export default Product;
