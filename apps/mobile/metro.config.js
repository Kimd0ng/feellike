const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

// Workspace root (monorepo)
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

/**
 * Metro 설정
 * 모노레포 환경에서 워크스페이스 패키지를 인식하도록 설정
 */
const config = {
    watchFolders: [workspaceRoot],
    resolver: {
        nodeModulesPaths: [
            path.resolve(projectRoot, 'node_modules'),
            path.resolve(workspaceRoot, 'node_modules'),
        ],
        // 워크스페이스 패키지를 위한 extraNodeModules 설정
        extraNodeModules: {
            '@feellike/api': path.resolve(workspaceRoot, 'packages/api'),
            '@feellike/ui': path.resolve(workspaceRoot, 'packages/ui'),
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
