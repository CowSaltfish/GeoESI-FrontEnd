import { Col, Row } from 'antd';
import GGEditor, { Koni } from 'gg-editor';

import { PageContainer } from '@ant-design/pro-layout';
import styles from '../css/editor.less';

import { Card } from 'antd';
import { Minimap } from 'gg-editor';

import { CanvasMenu, ContextMenu, EdgeMenu, GroupMenu, MultiMenu, NodeMenu } from 'gg-editor';

// import MenuItem from './MenuItem';
import contextmenustyles from '../css/ContextMenu.less';
import { Command } from 'gg-editor';
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

import { Item, ItemPanel } from 'gg-editor';
// import { Card } from 'antd';
import itempanelstyles from '../css/ItemPanel.less';

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_1101588_01zniftxm9yp.js',
});




GGEditor.setTrackable(false);

