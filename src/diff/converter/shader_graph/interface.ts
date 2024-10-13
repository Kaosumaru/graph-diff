/* eslint-disable @typescript-eslint/no-explicit-any */
export type SlotType =
    | 'UnityEditor.ShaderGraph.Vector1MaterialSlot'
    | 'UnityEditor.ShaderGraph.Vector2MaterialSlot'
    | 'UnityEditor.ShaderGraph.Vector3MaterialSlot'
    | 'UnityEditor.ShaderGraph.Vector4MaterialSlot'
    | 'UnityEditor.ShaderGraph.NormalMaterialSlot'
    | 'UnityEditor.ShaderGraph.TangentMaterialSlot'
    | 'UnityEditor.ShaderGraph.ColorRGBMaterialSlot';

export type NodeType = 'UnityEditor.ShaderGraph.BlockNode' | 'UnityEditor.ShaderGraph.Vector4Node';

export type Type =
    | 'UnityEditor.ShaderGraph.GraphData'
    | 'UnityEditor.ShaderGraph.CategoryData'
    | 'UnityEditor.Rendering.Universal.ShaderGraph.UniversalTarget'
    | 'UnityEditor.Rendering.Universal.ShaderGraph.UniversalLitSubTarget'
    | SlotType
    | NodeType;

export interface GraphEntry {
    m_SGVersion: number;
    m_Type: Type;
    m_ObjectId: string;
}

export interface GraphData extends GraphEntry {
    m_Type: 'UnityEditor.ShaderGraph.GraphData';

    m_Properties: any[];
    m_Keywords: any[];
    m_Dropdowns: any[];
    m_CategoryData: Id[];
    m_Nodes: Id[];
    // m_GroupDatas: any[],
    // m_StickyNoteDatas: any[],
    m_Edges: Edge[];
    m_VertexContext: Context;
    m_FragmentContext: Context;
    // m_PreviewData: MPreviewData, probably mesh with preview?
    m_Path: string;
    m_GraphPrecision: number;
    m_PreviewMode: number;
    m_OutputNode: Id;
    m_SubDatas: any[];
    m_ActiveTargets: Id[];
}

export interface CategoryData extends GraphEntry {
    m_Type: 'UnityEditor.ShaderGraph.CategoryData';
    m_Name: string;
    m_ChildObjectList: Id[]; // maybe
}

export interface Node extends GraphEntry {
    m_Type: NodeType;

    m_Group: Id;
    m_Name: string;
    m_DrawState: DrawState;

    m_Slots: Id[];
    // synonyms: string[]
    m_Precision: number;
    m_PreviewExpanded: boolean;
    m_DismissedVersion: number;
    m_PreviewMode: number;

    m_Value?: any;
    // m_CustomColors: MCustomColors ??
}

export interface UniversalLitSubTarget extends GraphEntry {
    m_Type: 'UnityEditor.ShaderGraph.BlockNode';

    m_WorkflowMode: number;
    m_NormalDropOffSpace: number;
    m_ClearCoat: boolean;
    m_BlendModePreserveSpecular: boolean;
}

export interface Vector4Node extends Node {
    m_Type: 'UnityEditor.ShaderGraph.Vector4Node';

    m_Value: any; // x y z
}

export interface BlockNode extends Node {
    m_Type: 'UnityEditor.ShaderGraph.BlockNode';

    m_SerializedDescriptor: string;
}

export interface Slot extends GraphEntry {
    m_Type: SlotType;

    m_Id: number;
    m_DisplayName: string;
    m_SlotType: number;
    m_Hidden: boolean;
    m_ShaderOutputName: string;
    m_StageCapability: number;
    m_Value: any;
    m_DefaultValue: any;
    m_Labels: any[];
}

export interface Id {
    m_Id: string;
}

export interface SlotRef {
    m_Node: Id;
    m_SlotId: number;
}

export interface Edge {
    m_OutputSlot: SlotRef;
    m_InputSlot: SlotRef;
}

export interface Context {
    m_Position: Position;
    m_Blocks: Id[];
}

export interface Position {
    x: number;
    y: number;

    width?: number;
    height?: number;
}

export interface DrawState {
    m_Expanded: boolean;
    m_Position: Position;
}
