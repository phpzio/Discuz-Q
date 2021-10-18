<?php

/**@var Discuz\Http\RouteCollection $route*/

//拉取商品信息
$route->post('wxshop/list', 'wxshop.list', \Plugin\Shop\Controller\WxShopListController::class);
//拉取商店信息
$route->post('wxshop/info', 'wxshop.info', \Plugin\Shop\Controller\WxShopInfoController::class);
//上传图片
$route->get('shop/uploadimag', 'shop.uploadimag', \Plugin\Shop\Controller\ShopUploadImageController::class);


