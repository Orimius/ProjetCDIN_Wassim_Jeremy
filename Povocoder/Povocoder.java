import java.awt.image.SampleModel;
import java.util.concurrent.CompletionException;

import static java.lang.System.exit;
import static java.lang.System.out;

public class Povocoder {

    // Processing SEQUENCE size (100 msec with 44100Hz samplerate)
    final static int SEQUENCE = StdAudio.SAMPLE_RATE/10;
    // Overlapping size (20 msec)
    final static int OVERLAP = SEQUENCE/5 ;
    // Best OVERLAP offset seeking window (15 msec)
    final static int SEEK_WINDOW = 3*OVERLAP/4;

    public static void main(String[] args) {
        if (args.length < 2)
        {
            System.out.println("usage: povocoder input.wav freqScale\n");
            exit(1);
        }

        try
        {
            String wavInFile = args[0];
            double freqScale = Double.valueOf(args[1]);
            String outPutFile= wavInFile.split("\\.")[0] + "_" + freqScale +"_";


            // Open input .wev file
            double[] inputWav = StdAudio.read(wavInFile);

            // Resample test
            double[] newPitchWav = resample(inputWav, freqScale);
            StdAudio.save(outPutFile+"Resampled.wav", newPitchWav);

            // Simple dilatation
            // double[] outputWav   = vocodeSimple(newPitchWav, 1.0/freqScale);
            // StdAudio.save(outPutFile+"Simple.wav", outputWav);

            // Simple dilatation with overlaping
            // outputWav = vocodeSimpleOver(newPitchWav, 1.0/freqScale);
            // StdAudio.save(outPutFile+"SimpleOver.wav", outputWav);

            // Simple dilatation with overlaping and maximum cross correlation search
            // outputWav = vocodeSimpleOverCross(newPitchWav, 1.0/freqScale);
            // StdAudio.save(outPutFile+"SimpleOverCross.wav", outputWav);

            joue(newPitchWav);

            // Some echo above all
            // outputWav = echo(outputWav, 100, 0.7);
            // StdAudio.save(outPutFile+"SimpleOverCrossEcho.wav", outputWav);

        }
        catch (Exception e)
        {
            System.out.println("Error: "+ e.toString());
        }
    }
    
    public static void joue(double[] input)
    {

      StdAudio.play(input);  

    }

    public static double[] resample(double[] input, double freqScale)
    {
        int longInput = input.length;

        if(freqScale > 1)
        {
        
	        freqScale = (freqScale-1)/freqScale;
	        
	        int longSupr = (int)(longInput*freqScale+1);

	        int longNewPitchWav1 = longInput-longSupr;

	        int freqSupr = longInput/longSupr;
	        
	        double [] newPitchWav1 = new double [longNewPitchWav1];

	        System.out.println("longInput = "+longInput);
	        System.out.println("freqScale = "+freqScale);
	        System.out.println("longSupr = "+longSupr);
	        System.out.println("longNewPitchWav1 = "+longNewPitchWav1);
	        System.out.println("freqSupr = "+freqSupr);

	        int compteur = 0;

	        for(int i=0; i<longInput; i++)
	        {
	           if(i%freqSupr != 0)
	            {
	               newPitchWav1[i-compteur] = input[i]; 
	            }
	            else
	            {
	                compteur++;
	            }      
	        }
	        
       		return newPitchWav1;
        }
        
        if(freqScale < 1)
        {
        	freqScale = (1-freqScale)/freqScale;
        
	        int longAdd = (int)(longInput*freqScale);

	        int longNewPitchWav2 = longInput+longAdd;

	        int freqAdd = longInput/longAdd;
	        
	        double [] newPitchWav2 = new double [longNewPitchWav2];

	        System.out.println("longInput = "+longInput);
	        System.out.println("freqScale = "+freqScale);
	        System.out.println("longAdd = "+longAdd);
	        System.out.println("longNewPitchWav2 = "+longNewPitchWav2);
	        System.out.println("freqAdd = "+freqAdd);

	        int compteur = -1;

	        for(int i=0; i<longNewPitchWav2; i++)
	        {
	           if(i%freqAdd == 0)
	            {
	                compteur++;
	            }
	           
	            newPitchWav2[i] = input[i-compteur]; 
	            
	        }
            
            return newPitchWav2;
        }

        return input;
    }    

  }





