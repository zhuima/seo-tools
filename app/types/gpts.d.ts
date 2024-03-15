/*
 * @Author: zhuima zhuima314@gmail.com
 * @Date: 2024-03-14 14:25:32
 * @LastEditors: zhuima zhuima314@gmail.com
 * @LastEditTime: 2024-03-15 11:18:41
 * @FilePath: /gpts-works/web/app/types/gpts.d.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

export interface Items {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: any; // 根据实际情况定义 cover 属性的类型
  icon: any; // 根据实际情况定义 icon 属性的类型
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    Link: {
      id: string;
      type: string;
      url: string;
    };
    Rating: {
      id: string;
      type: string;
      number: number;
    };
    Description: {
      id: string;
      type: string;
      rich_text: {
        type: string;
        text: {
          content: string;
          link: any; // 根据实际情况定义 link 属性的类型
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: any; // 根据实际情况定义 href 属性的类型
      }[];
    };
    IsFree: {
      id: string;
      type: string;
      checkbox: boolean;
    };
    Tags: {
      id: string;
      type: string;
      multi_select: {
        id: string;
        name: string;
        color: string;
      }[];
    };
    Icon: {
      id: string;
      type: string;
      url: string;
    };
    Slug: {
      id: string;
      type: string;
      rich_text: {
        type: string;
        text: {
          content: string;
          link: any; // 根据实际情况定义 link 属性的类型
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: any; // 根据实际情况定义 href 属性的类型
      }[];
    };
    Date: {
      id: string;
      type: string;
      date: {
        start: string;
        end: any; // 根据实际情况定义 end 属性的类型
        time_zone: any; // 根据实际情况定义 time_zone 属性的类型
      };
    };
    IsFire: {
      id: string;
      type: string;
      checkbox: boolean;
    };
    Title: {
      id: string;
      type: string;
      title: {
        type: string;
        text: {
          content: string;
          link: any; // 根据实际情况定义 link 属性的类型
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: any; // 根据实际情况定义 href 属性的类型
      }[];
    };
  };
  url: string;
  public_url: any; // 根据实际情况定义 public_url 属性的类型
}

export interface Posts {
  code: number;
  message: string;
  data: {
    rows: Items[];
    count: number;
  };
}

export interface Gpts {
  uuid: string;
  org_id: string;
  name: string;
  description: string;
  avatar_url: string;
  short_url: string;
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
  detail?: any;
  visit_url?: string;
  rating?: number;
}
