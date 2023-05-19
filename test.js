
const data = {
    "getMeasure": [
        {"name": "存款利率", "timeRange": "最近3年"},
        {"name": "GDP", "timeRange": "最近2年"}
    ],
    "searchMarket": [
        {"query": "最近1年低风险的收益稳健的前10支股票"},
        {"query": "最近3个月涨幅前5的基金"}
    ]
};

// 提取 getMeasure 中的 name 和 searchMarket 中的 query
const namesAndQueries = [
    ...(data.getMeasure || []).map(({name}) => name),
    ...data.searchMarket.map(({query}) => query)
];

// 将对象转换为字符串，并将字符串连接起来，并用逗号分隔
const result = namesAndQueries.join(',');

const kk = 0;

if (kk) {
    console.log('kk yes ');
} else {
    console.log('kk no ');
}

console.log(result);
