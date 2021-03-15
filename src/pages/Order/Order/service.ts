import request from '@/utils/request';
//查询人员列表
export async function queryUserRule(params?:any) {
  return request('/api/rule', {
    params,
  });
}
//查询
export async function queryRule(params?:any) {
  return request('/api/rule', {
    params,
  });
}
//删除
export async function deleteRule(params:any) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
//提醒
export async function alarmRule(params:any) {
    return request('/api/rule', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }
//取消
export async function cancleRule(params:any) {
    return request('/api/rule', {
        method: 'POST',
        data: {
          ...params,
        },
      });
}
//备注
export async function markRule(params: any) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
//退单
export async function chargeBackRule(params: any) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
//导出
export async function exportRule(params: any) {
    return request('/api/rule', {
      method: 'POST',
      data: {
        ...params,
      },
    });
  }