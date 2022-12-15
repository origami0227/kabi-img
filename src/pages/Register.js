import React from 'react';
import {Button, Form, Input} from 'antd';
import styled from 'styled-components'
import {useStores} from "../stores";


const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 20px;
`
const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

const Register = () => {
    const {AuthStore} = useStores()
    const onFinish = (values) => {
        console.log('Success:', values);
        AuthStore.setUsername(values.username)
        AuthStore.setPassword(values.password)//先设置好用户名和密码调用login的时候才能找到相应的属性
        AuthStore.register()
            .then(() => {
                console.log('注册成功，跳转到首页')
            })
            .catch(() => {
                console.log('注册失败，什么都不做')
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    //用户名校验
    const validateUsername = {
        username(rule, value,) {
            if (/\W/.test(value)) return Promise.reject('不能出现下划线字母数字以外的字符')
            if (value.length < 4 || value.length > 10) return Promise.reject('用户名长度为4-10个字符')
            return Promise.resolve()
        }
    }
    //确认密码校验
    const confirmPassword = ({getFieldValue}) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve() //未输入或者两次密码匹配的情况
            }
            return Promise.reject('两次密码不匹配')
        }
    })
    return (
        <Wrapper>
            <Title>注册</Title>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名',
                        },
                        {
                            validator: validateUsername.username
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码', //不填会提示
                        },
                        {
                            min: 6,
                            message: '最少输入6个字符',//如果比六个字符小则会提示
                        },
                        {
                            max: 16,
                            message: '不能超过16个字符',//超过16个字符也会提示
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="确认密码"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: '请再次确认密码',
                        },
                        confirmPassword
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,//偏移
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};
export default Register;