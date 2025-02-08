import useAI from './useAI';
import useOCR from './useOCR';

export default function useNameCardReader({ lang, onSuccess, onError } ={}) {

  const makeError = (message) => onError({ message });
  const { generate, loading: loadingAI } = useAI({
    onSuccess: ({ response }) => {
      if (!response || response === undefined) {
        makeError('No response field in AI data');
        return;
      }
      
      const parts = response.split('```');
      const jsonString = parts[1] ? parts[1].replace(/^json/, '') : false;
      if (!jsonString || jsonString === undefined) {
        makeError('Failed to find json in a resulted string.');
        console.log('AI response', response)
        return
      }
    
      const json = JSON.parse(jsonString.toString('utf8'));
      if(json) {
        onSuccess({ data: json });
      } 
      else makeError('Failed to parse json response')
    },
    onError: (e) => console.log(e)
  });

  const { scan, loading: loadingOCR } = useOCR({
    lang: lang || 'zh',
    onSuccess: (data) => {
      if (data && data.text ) {
        const prompt = `Here is a text received from OCR text recognition of an image of a name card. Based on this text - write for me a 
        json string that contains the keys: 
          company_name (string - not explicitly mentioned - usually at the start of the OCR text), 
          phones(array of strings, usually starting with 13...), 
          emails (array of strings), 
          qq (usually a number),
          website,
          whatsapp,
          skype, 
          address,
          banks,
          description (string), 
          other.
        Enclose the resulted json code with \`\`\`json ... \`\`\`. Do not include any comments (//) in the json string.
        Here is the raw OCR text: 
        
        ${data.text}`;
        generate({prompt, model: 'mistral:latest'});
      } else makeError('Failed to scan the text from the name card.')
    },
    onError: (e) => makeError('Failed to scan')
  });

  const loading = loadingAI || loadingOCR;

  return { scan, loading, loadingAI, loadingOCR}

};
