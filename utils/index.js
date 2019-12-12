import Router from "next/router";

export const isServer = process.browser;

export const formatPrice = value =>
  value ? value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) : null

export const mapIndex = (arr = []) => arr.map((item, index) => {
  item["key"] = ++index;
  return item;
});

export const currentUrl = () => Router.route;

export const redirectURL = (url, option) => Router.replace(url);

export const isEmptyObject = object => !Object.keys(object).length;