import {KeyConfiguration, ModelType} from "@/types";
import {NextApiRequest} from "next";
import {
    AZURE_OPENAI_API_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_INSTANCE_NAME,
    AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_API_VERSION,
    OPENAI_API_KEY,
    OPENAI_API_MODEL,
    OPENAI_TYPE
} from "./const";

export const getKeyConfiguration = (req: NextApiRequest): KeyConfiguration => {
    if (!OPENAI_TYPE) {
        return getKeyConfigurationFromReqHeaders(req);
    }
    return getKeyConfigurationFromEnvironment();
}

const getKeyConfigurationFromReqHeaders = (req: NextApiRequest): KeyConfiguration => {
    const apiType = req.headers['x-api-type'];
    const apiKey = req.headers['x-api-key'] as string;
    const apiModel = req.headers['x-api-model'] as string;
    const azureApiKey = req.headers['x-azure-api-key'] as string;
    const azureInstanceName = req.headers['x-azure-instance-name'] as string;
    const azureApiVersion = req.headers['x-azure-api-version'] as string;
    const azureDeploymentName = req.headers['x-azure-deployment-name'] as string;
    const azureEmbeddingDeploymentName = req.headers['x-azure-embedding-deployment-name'] as string;
    const keyConfiguration = { apiType: apiType as ModelType, 
        apiKey,
        apiModel,
        azureApiKey, 
        azureInstanceName, 
        azureApiVersion, 
        azureDeploymentName, 
        azureEmbeddingDeploymentName
    };
    validateKeyConfiguration(keyConfiguration);
    return keyConfiguration;
}

const getKeyConfigurationFromEnvironment = (): KeyConfiguration => {
    const apiType = OPENAI_TYPE as ModelType;
    const apiKey = OPENAI_API_KEY;
    const apiModel = OPENAI_API_MODEL;
    const azureApiKey = AZURE_OPENAI_API_KEY;
    const azureInstanceName = AZURE_OPENAI_API_INSTANCE_NAME;
    const azureApiVersion = AZURE_OPENAI_API_VERSION;
    const azureDeploymentName = AZURE_OPENAI_API_DEPLOYMENT_NAME;
    const azureEmbeddingDeploymentName = AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME;

    const keyConfiguration = {
        apiType,
        apiKey,
        apiModel,
        azureApiKey,
        azureInstanceName, 
        azureApiVersion, 
        azureDeploymentName, 
        azureEmbeddingDeploymentName
    };
    validateKeyConfiguration(keyConfiguration);
    return keyConfiguration;
}

const validateKeyConfiguration = (keyConfiguration: KeyConfiguration): boolean => {
    if (keyConfiguration.apiType === ModelType.OPENAI) {
        if (!keyConfiguration.apiKey) throw new Error(`Expected environment value: OPENAI_API_KEY`);
    }
    if (keyConfiguration.apiType === ModelType.AZURE_OPENAI) {
        if (!keyConfiguration.azureApiKey || !keyConfiguration.azureInstanceName || !keyConfiguration.azureApiVersion || !keyConfiguration.azureDeploymentName || !keyConfiguration.azureEmbeddingDeploymentName) {
            throw new Error(`Expected environment value: AZURE_OPENAI_API_KEY`);
        }
    }
    return true;
}