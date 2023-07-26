<div align="center">
  
<h1 align="center">ChatEmail</h1>

[![license](https://img.shields.io/github/license/modelscope/modelscope.svg)](./LICENSE)

🚀 和邮件对话，提取邮件摘要、翻译邮件、分析邮件类型等

</div>

## 使用

### 😊初始化向量数据库(Supabase)
- 注册Supabase账户
  
  🔗 [https://supabase.com/](https://supabase.com/)
  
- 创建一个新项目
  
  获取`SUPABASE_API_URL`和`SUPABASE_API_KEY`
  
  ![supabase.png](./doc/supabase.png)

- 创建数据库表

  在数据库中运行以下语句:
  
  ```sql
    -- Enable the pgvector extension to work with embedding vectors
    create extension vector;
    
    -- Create a table to store your documents
    create table documents (
      id bigserial primary key,
      content text, -- corresponds to Document.pageContent
      metadata jsonb, -- corresponds to Document.metadata
      embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed
    );
    
    -- Create a function to search for documents
    create function match_documents (
      query_embedding vector(1536),
      match_count int DEFAULT null,
      filter jsonb DEFAULT '{}'
    ) returns table (
      id bigint,
      content text,
      metadata jsonb,
      similarity float
    )
    language plpgsql
    as $$
    #variable_conflict use_column
    begin
      return query
      select
        id,
        content,
        metadata,
        1 - (documents.embedding <=> query_embedding) as similarity
      from documents
      where metadata @> filter
      order by documents.embedding <=> query_embedding
      limit match_count;
    end;
    $$;
    ```

### 😏设置环境变量
1. 在代码根目录生成.env文件
  ```shell
  cp .env.sample .env
  ```
2. 设置.env文件中的环境变量
   
### 😁本地运行
执行以下命令：
```shell
npm install

npm run dev
```
打开浏览器，访问[http://localhost:3000](http://localhost:300)
