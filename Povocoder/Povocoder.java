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
        double longSignal = input.length; // Longueur du signal de base

        if(freqScale > 1)
        {
            double freqEchantillon = (freqScale-1)/freqScale; // frequence d'échantillonnage

            double longThNewSignal = (longSignal-(longSignal*freqEchantillon)); // longueur théorique du nouveau signal

            int freqSupr = (int)(longSignal/(longSignal-longThNewSignal));    // frequence de valeur à surprimer

            int longNewSignal = (int)(longSignal-(longSignal/freqSupr));   // longueur du nouveau signal

            double [] newPitchWav1 = new double[longNewSignal];

            int compteur = 0;

            for(int i=0; i<longSignal; i++)
            {
                if(i%freqSupr != 0)
                {
                    newPitchWav1[i] = input[i-compteur];
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
            double freqEchantillon = (1-freqScale)/freqScale;	// frequence d'échantillonnage
            
            double longThNewSignal = (longSignal+(longSignal*freqEchantillon));	// longueur théorique du nouveau signal
            
            int freqSupr = (int)(longSignal/(longThNewSignal-longSignal));    // frequence de valeur à ajouter

            int longNewSignal = (int)(longSignal*(1.0+(1.05/freqSupr)));   // longueur du nouveau signal
            System.out.println(freqSupr);
            double [] newPitchWav2 = new double[longNewSignal];

            int compteur = 0;

            for(int i=0; i<longNewSignal; i++)
			{
	            newPitchWav2[i] = input[i-compteur];
	            if(i%freqSupr == 0)
	            {
	                compteur++;  
	            }
	        }
            //  for(int i=0; i<longNewSignal; i++)
            // {
            //     System.out.println(newPitchWav2[i]);
            // }
            return newPitchWav2;
        }

        return input;
    }    

  }





