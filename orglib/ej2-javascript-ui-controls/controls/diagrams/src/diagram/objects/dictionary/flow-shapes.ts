/**
 * FlowShapeDictionary defines the shape of the built-in flow shapes \
 *
 * @returns { string }     FlowShapeDictionary defines the shape of the built-in flow shapes .\
 * @param {string} shape - provide the element value.
 *
 * @private
 */
export function getFlowShape(shape: string): string {
    return flowShapes[shape.toString()];
}
/* eslint-disable */
let flowShapes: {} = {
    // Process,
    'Process': 'M419.511,76.687L359.511,76.687L359.511,43.086L419.511,43.086z',
    // Decision,
    'Decision': 'M 253.005,115.687L 200.567,146.071L 148.097,115.687L 200.534,85.304L 253.005,115.687 Z',
    // Document,
    'Document': 'M 60 31.9 c 0 0 -11 -7.7 -30 0 s -30 0 -30 0 V 0 h 60 V 31.9 Z',
    // PreDefinedProcess,
    'PreDefinedProcess': 'M 0,0 L 50,0 L 50,50 L 0,50 Z  M 8.334,0 L 8.334,50 M 41.667,0 L 41.667,50',
    // Terminator,
    'Terminator': 'M 269.711,29.33C 269.71,44.061 257.77,56 243.04,56L 158.058,56C 143.33,56 131.39,44.061 131.39,29.33L 131.39,29.33' +
        'C 131.391,14.6057 143.33,2.669 158.058,2.669L 243.044,2.669C 257.772,2.669 269.711,14.6057 269.711,29.333 Z',
    // PaperTap,
    'PaperTap': 'M0.0009,17.2042 L0.0009,47.165 C0.001,47.165 14.403,53.5455 25.00,47.165 C35.599,40.7852 44.403,43.5087 50.00,47.165' +
        'L50.001,17.2042 M50.001,32.7987 L50.001,2.8405 C50.001,2.8405 35.599,-3.5427 25.001,2.8405' +
        'C14.403,9.2237 5.599,6.494 0.0009,2.8405 L0.0009,32.7987',
    // DirectData,
    'DirectData': 'M 132.62 0 L 17.38 0 C 7.78 0 0 13.43 0 30 C 0 46.57 7.78 60 17.38 60 L 132.62 60 M 132.62 0' +
    'C 123.02 0 115.24 13.43 115.24 30 C 115.24 46.57 123.02 60 132.62 60 C 142.22 60 150 46.57 150 30 C 150 13.43 142.22 0 132.62 0 z ',
    // SequentialData,
    'SequentialData': 'M0.0029,24.999 C0.0029,11.1922 10.433,0.0021 23.295,0.0021 C36.159,0.00216 46.585,11.1922 46.585,24.999' +
        'C46.585,38.8057 36.159,49.9979 23.295,49.9979 C10.433,49.9979 0.0029,38.8057 0.0029,24.999 z M23.294,49.999 L50.002,49.999',
    // Sort,
    'Sort': 'M50.001,24.9971 L25.001,49.9971 L0.00097,24.9971 L25.001,-0.00286865 L50.001,24.9971 z' +
        ' M0.000976562,24.9971 L50.001,24.9971',
    // MultiDocument,
    'MultiDocument': 'M43.6826,40 C44.8746,40.6183 45.8586,41.3502 46.8366,42.1122 L46.8366,4.74487 L3.09857,4.74487 L3.09857,10.9544' +
        ' M46.837,35.143 C48.027,35.765 49.025,36.604 50.003,37.369 L50.003,0.002 L6.264,0.002 L6.264,4.744 M43.682,47.113 L43.682,10.765' +
        ' L0.0025,10.7652 L0.0025,47.1132 C0.0025,47.1132 12.5846,53.6101 21.8426,47.1132 C31.1006,40.6163 38.792,43.393 43.6826,47.1132 z',
    // Collate,
    'Collate': 'M50.001,0.0028 L25.001,25.0029 L0.00097,0.0028 L50.001,0.002 z M0.0009,50.002 L25.001,25.002' +
        'L50.001,50.002 L0.0009,50.0029 z',
    // SummingJunction,
    'SummingJunction': 'M7.3252,42.6768 L42.6772,7.3247 M42.6768,42.6768 L7.3248,7.3247 M0.0009,25.001 ' +
        'C0.0009,11.193 11.197,0.0009 25.001,0.0009' +
        ' C38.809,0.0009 50.001,11.193 50.001,25.001 C50.001,38.809 38.809,50.001 25.001,50.001 C11.197,50.00 0.0009,38.809 0.0009,25.00 z',
    // Or,
    'Or': 'M 0 50 L 100 50 M 50 100 L 50 0.0 M 0 50 C 0 22.384 22.392 0 50 0 C 77.616 0 100 22.384 100 50' +
        ' C 100 77.616 77.616 100 50 100 C 22.392 100 0 77.616 0 50 Z',
    // InternalStorage,
    'InternalStorage': 'M 0 3.81946A 2.5,3.81946 0 0,1 2.5,0L 47.5 0A 2.5,3.81946 0 0,1 50,3.81946' +
        'L 50 45.836A 2.5,3.819446 0 0,1 47.5,49.652778' +
        'L 2.5 49.652778A 2.5,3.819446 0 0,1 0,45.8336L 0 3.819446ZM 0 11.45834L 50 11.4583334M 12.5 0L 12.5 49.652778',
    // Extract,
    'Extract': 'M0,35 L30,0 L60,35 Z',
    // ManualOperation,
    'ManualOperation': 'M46.4,28.8 L14.8,28.8 L0,0 L60,0 Z',
    // Merge,
    'Merge': 'M60,0 L30,35 L0,0 Z',
    // OffPageReference,
    'OffPageReference': 'M60,33.3 L30.1,39 L0,33.3 L0,0 L60,0 Z',
    // SequentialAccessStorage,
    'SequentialAccessStorage': 'M 60 30 C 60 13.4 46.6 0 30 0 S 0 13.4 0 30 s 13.4 30 30 30 h 28.6 v -6.5 h -9.9' +
        'C 55.5 48 60 39.5 60 30 Z',
    // Annotation,
    'Annotation': 'M49.9984,50.0029 L-0.00271199,50.0029 L-0.00271199,0.00286865 L49.9984,0.00286865',
    // Annotation2,
    'Annotation2': 'M49.9977,50.0029 L25.416,50.0029 L25.416,0.00286865 L49.9977,0.00286865 M25.4166,25.0029 L-0.00227869,25.0029',
    // Data,
    'Data': 'M 10 0 L 40 0 L 30 40 L 0 40 Z',
    // Card,
    'Card': 'M275,60 L400,60 L400,110 L260,110 L260,75 Z',
    // Delay,
    'Delay': 'M0,0 L12.029,0 C14.212999,0 16,1.7869979 16,3.9709952 C16,6.1549926 14.212999,7.9409904 12.029,7.9409904 L0,7.9409904 z',
    // Preparation,
    'Preparation': 'M 1048.17 572 C 1051.06 568.86 1055.17 567.05 1059.5 567 L 1094.51 567'
        + ' C 1098.84 567.05 1102.95 568.86 1105.84 572' +
        ' L 1126.43 595 C 1127.01 596.28 1127.01 597.72 1126.43 599 L 1105.84 622 C 1102.95 625.14 1098.84 626.95 1094.51 627' +
        ' L 1059.5 627 C 1055.17 626.95 1051.06 625.14 1048.17 622 L 1027.58 599 C 1027 597.72 1027 596.28 1027.58 595 L 1048.17 572 Z',
    // Display,
    'Display': 'M47.8809,19.2914 L32.7968,-0.00594145 L11.3902,-0.00594145 C7.93166,-0.00594145 0.00124586,11.187 0.00124586,24.9968' +
        'C0.00124586,38.8032 7.93166,49.9962 11.3902,49.9962 L32.7968,49.99 L47.615,31.038 C47.615,31.0388 52.798,24.9968 47.880,19.2914 z',
    // ManualInput,
    'ManualInput': 'M 912 732 L 1006.85 707 C 1008.2 707 1009.5 707.53 1010.46 708.46 C 1011.41 709.4 1011.95 710.67 1011.95 712' +
        ' L 1011.95 762C 1012 764.41 1010.28 766.52 1007.87 767 L 917.1 767 C 915.75 767 914.45 766.47 913.49 765.54' +
        ' C 912.54 764.6 912 763.33 912 762 L 912 732 Z',
    // LoopLimit,
    'LoopLimit': 'M 8 9 L 27 9 L 33 15 L 33 26 C 33 27 33 27 32 27 L 4 27 C 3 27 2 27 2 26 L 2 15 L 8 9 Z',
    // StoredData
    'StoredData': 'M 5.55 0L 50 0A 1.5,30 0 0,1 50,0A 5.555,25 0 0,0 50,50A 1.5,30 0 0,1 50,50L 5.555 50A 5.55,25 0 0,1 5.555,0Z',
};

/* eslint-enable */
