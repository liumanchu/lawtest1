{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // File: /api/chatgpt-proxy.js\
\
export default async function handler(req, res) \{\
  if (req.method !== 'POST') \{\
    res.status(405).json(\{ error: 'Method not allowed' \});\
    return;\
  \}\
  \
  const \{ prompt, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 \} = req.body;\
\
  try \{\
    const response = await fetch('https://api.openai.com/v1/chat/completions', \{\
      method: 'POST',\
      headers: \{\
        'Content-Type': 'application/json',\
        'Authorization': `Bearer $\{process.env.CHATGPT_API_KEY\}` // API key stored as an env variable\
      \},\
      body: JSON.stringify(\{\
        model,\
        messages: [\
          \{ role: "system", content: "You are a helpful assistant." \},\
          \{ role: "user", content: prompt \}\
        ],\
        temperature,\
        max_tokens\
      \})\
    \});\
    \
    const data = await response.json();\
    res.status(response.status).json(data);\
  \} catch (error) \{\
    res.status(500).json(\{ error: error.message \});\
  \}\
\}\
}