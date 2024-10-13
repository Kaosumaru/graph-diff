import * as model from '../../interface/NodeInterface';
import { NodeDecorator } from './decorateNode';

class ParentNode extends NodeDecorator {
    decorate(node: model.Node): void {
        super.decorate(node);

        this.member('currentPrecisionType');
        this.member('showPreview');
    }

    name = 'Parent Node';
}

class OutputNode extends ParentNode {
    decorate(node: model.Node): void {
        super.decorate(node);

        this.member('isMainOutputNode');
        this.member('lodIndex');
    }

    name = 'Master Node';
}

class MasterNode extends OutputNode {
    decorate(node: model.Node): void {
        super.decorate(node);

        this.member('shaderModelIdx');
        this.member('customInspectorName');
        this.member('shaderLOD');
        this.member('masterNodeCategory');
    }

    name = 'Master Node';
}

class StandardSurfaceOutputNode extends MasterNode {
    decorate(node: model.Node): void {
        super.decorate(node);

        const lightModel = this.member('currentLightModel');
        if (lightModel) {
            this.addSockets(lightModel);
        }

        this.member('shaderName');

        //m_renderingOptionsOpHelper.WriteToString( ref nodeInfo );
        this.renderingOptionsOpHelper();

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_cullMode );
        this.member('cullMode');

        //m_zBufferHelper.WriteToString( ref nodeInfo );
        this.zBuffer();

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_alphaMode );
        this.member('alphaMode');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_opacityMaskClipValue );
        this.member('opacityMaskClipValue');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_keepAlpha );
        this.member('keepAlpha');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_castShadows );
        this.member('castShadows');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_queueOrder );
        this.member('queueOrder');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_customBlendMode );
        this.member('customBlendMode');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_renderType );
        this.member('renderType');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_customRenderType );
        this.member('customRenderType');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_renderQueue );
        this.member('renderQueue');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_renderPath );
        this.member('renderPath');

        //m_renderingPlatformOpHelper.WriteToString( ref nodeInfo );
        //m_colorMaskHelper.WriteToString( ref nodeInfo );
        //m_stencilBufferHelper.WriteToString( ref nodeInfo );
        //m_tessOpHelper.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, m_receiveShadows );
        //m_blendOpsHelper.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, m_grabOrder );
        //m_outlineHelper.WriteToString( ref nodeInfo );
        //m_billboardOpHelper.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, m_vertexMode );
        //IOUtils.AddFieldValueToString( ref nodeInfo, ShaderLOD );
        //m_fallbackHelper.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, ( m_maskClipReorder != null ) ? m_maskClipReorder.OrderIndex : -1 );
        //IOUtils.AddFieldValueToString( ref nodeInfo, ( m_translucencyReorder != null ) ? m_translucencyReorder.OrderIndex : -1 );
        //IOUtils.AddFieldValueToString( ref nodeInfo, ( m_refractionReorder != null ) ? m_refractionReorder.OrderIndex : -1 );
        //IOUtils.AddFieldValueToString( ref nodeInfo, ( m_tessellationReorder != null ) ? m_tessellationReorder.OrderIndex : -1 );
        //m_customTagsHelper.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, m_alphaToCoverage );
        //m_dependenciesHelper.WriteToString( ref nodeInfo );
        //m_inlineCullMode.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, ( m_specColorReorder != null ) ? m_specColorReorder.OrderIndex : -1 );
        //m_inlineOpacityMaskClipValue.WriteToString( ref nodeInfo );
        //m_additionalDirectives.WriteToString( ref nodeInfo );
        //m_additionalSurfaceOptions.WriteToString( ref nodeInfo );
        //m_usePass.WriteToString( ref nodeInfo );
        //m_drawInstancedHelper.WriteToString( ref nodeInfo );
        //m_inlineChromaticAberration.WriteToString( ref nodeInfo );
        //m_inlineAlphaToCoverage.WriteToString( ref nodeInfo );
        //IOUtils.AddFieldValueToString( ref nodeInfo, m_samplingMacros );
    }

    renderingOptionsOpHelper(): void {
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Exclude Deferred", "exclude_path:deferred" ) );
        this.member('renderingOptions.codeGen.exclude_path:deferred');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Exclude Forward", "exclude_path:forward" ) );
        this.member('renderingOptions.codeGen.exclude_path:forward');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Exclude Legacy Deferred", "exclude_path:prepass" ) );
        this.member('renderingOptions.codeGen.exclude_path:prepass');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Shadows", "noshadow" ) );
        this.member('renderingOptions.codeGen.noshadow');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Ambient Light", "noambient" ) );
        this.member('renderingOptions.codeGen.noambient');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Per Vertex Light", "novertexlights" ) );
        this.member('renderingOptions.codeGen.novertexlights');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Lightmaps", "nolightmap " ) );
        this.member('renderingOptions.codeGen.nolightmap');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Dynamic Global GI", "nodynlightmap" ) );
        this.member('renderingOptions.codeGen.nodynlightmap');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Directional lightmaps", "nodirlightmap" ) );
        this.member('renderingOptions.codeGen.nodirlightmap');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Built-in Fog", "nofog" ) );
        this.member('renderingOptions.codeGen.nofog');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Meta Pass", "nometa" ) );
        this.member('renderingOptions.codeGen.nometa');
        //m_codeGenerationDataList.Add( new CodeGenerationData( " Add Pass", "noforwardadd" ) );
        this.member('renderingOptions.codeGen.noforwardadd');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_lodCrossfade );
        this.member('renderingOptions.lodCrossfade');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_disableBatching );
        this.member('renderingOptions.disableBatchin');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_ignoreProjector );
        this.member('renderingOptions.ignoreProjector');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_forceNoShadowCasting );
        this.member('renderingOptions.forceNoShadowCasting');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_forceEnableInstancing );
        this.member('renderingOptions.forceEnableInstancing');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_forceDisableInstancing );
        this.member('renderingOptions.forceDisableInstancing');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_specularHighlightToggle );
        this.member('renderingOptions.specularHighlightToggle');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_reflectionsToggle );
        this.member('renderingOptions.reflectionsToggle');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_useDefaultShadowCaster );
        this.member('renderingOptions.useDefaultShadowCaster');
    }

    zBuffer(): void {
        //m_zWriteMode.WriteToString( ref nodeInfo );
        this.inlineProperty('zBuffer.zWriteMode');

        //m_zTestMode.WriteToString( ref nodeInfo );
        this.inlineProperty('zBuffer.zTestMode');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_offsetEnabled );
        this.member('zBuffer.offsetEnabled');

        //m_offsetFactor.WriteToString( ref nodeInfo );
        this.inlineProperty('zBuffer.offsetFactor');

        //m_offsetUnits.WriteToString( ref nodeInfo );
        this.inlineProperty('zBuffer.offsetUnits');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_extraDepthPass );
        this.member('zBuffer.extraDepthPass');

        //IOUtils.AddFieldValueToString( ref nodeInfo, m_extrazTestMode );
        this.member('zBuffer.extrazTestMode');
    }

    inlineProperty(path: string): void {
        this.member(path + '.value');
        this.member(path + '.active');
        this.member(path + '.nodePropertyName');
    }

    addSockets(lightModel: string): void {
        this.addInputSocket('Albedo', 0);
        this.addInputSocket('Normal', 1);
        this.addInputSocket('Emission', 2);
        switch (lightModel) {
            case 'Standard':
                this.addInputSocket('Metallic', 3);
                this.addInputSocket('Smoothness', 4);
                this.addInputSocket('Occlusion', 5);
                break;
            case 'StandardSpecular':
                this.addInputSocket('Specular', 3);
                this.addInputSocket('Smoothness', 4);
                this.addInputSocket('Occlusion', 5);
                break;
            case 'CustomLighting':
            case 'Unlit':
            case 'Lambert':
            case 'BlinnPhong':
                this.addInputSocket('Specular', 3);
                this.addInputSocket('Gloss', 4);
                break;
        }

        this.addInputSocket('Transmission', 6);
        this.addInputSocket('Translucency', 7);
        this.addInputSocket('Refraction', 8);
        this.addInputSocket('Alpha', 9);
        this.addInputSocket('Discard', 10);

        this.addInputSocket('CustomLighting', 13);

        // vertex
        this.addInputSocket('VertexPosition', 11);
        this.addInputSocket('VertexNormal', 12);
        this.addInputSocket('VertexTangent', 16);

        this.addInputSocket('Tesselation', 14);
        this.addInputSocket('Debug', 15);
    }

    name = 'Surface Output';
}

NodeDecorator.register(
    'AmplifyShaderEditor.StandardSurfaceOutputNode',
    new StandardSurfaceOutputNode()
);

class PropertyNode extends ParentNode {
    decorate(node: model.Node): void {
        super.decorate(node);

        this.member('currentParameterType');
        this.member('propertyInspectorName');
        this.member('orderIndex');
        if (NodeDecorator.version > 4102) {
            const attribCount = this.numberMember('attribCount') ?? 0;
            this.skipMember(attribCount);
        }

        if (NodeDecorator.version > 4102) {
            this.member('variableMode');
        }

        if (NodeDecorator.version > 14201) {
            this.member('autoGlobalName');
        }

        if (NodeDecorator.version > 18707) {
            if (NodeDecorator.version == 18708) {
                this.skipMember();
            } else {
                const headerCount = this.numberMember('headerCount') ?? 0;
                this.skipMember(headerCount);
            }
        }

        if (NodeDecorator.version > 14403) {
            const enumCount = this.numberMember('enumCount') ?? 0;
            this.skipMember(enumCount);
            this.skipMember(enumCount);
        }

        if (NodeDecorator.version > 14501) {
            const enumModeInt = this.numberMember('enumModeInt') ?? 0;
            if (enumModeInt == 1) {
                this.member('enumClassName');
            }
            this.member('autoRegister');
            const customAttrCount = this.numberMember('customAttrCount');
            this.skipMember(customAttrCount);
        }

        if (NodeDecorator.version > 18003) {
            this.member('hybridInstanced');
        }
    }

    name = 'Property';
}

class RangedFloatNode extends PropertyNode {
    decorate(node: model.Node): void {
        super.decorate(node);

        this.member('defaultValue');
        const value = this.numberMember('materialValue');
        this.member('min');
        this.member('max');

        if (value && this.node) {
            this.node.label += ` (${value})`;
        }
    }

    name = 'Float';
}
NodeDecorator.register('AmplifyShaderEditor.RangedFloatNode', new RangedFloatNode());
